#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function scalar(value) {
  let trimmed = value.trim();
  const quoted = trimmed.match(/^(['"])(.*?)\1(?:\s+#.*)?$/);
  if (quoted) return quoted[2];
  trimmed = trimmed.replace(/\s+#.*$/, "").trim();
  if (trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function missingValue(value) {
  return !value || ["-", "TBD", "미지정", "human pending"].includes(value);
}

function humanReviewer(value) {
  return !missingValue(value) && !/^AI(?:\s|$)|AI synthesis|human pending/i.test(value);
}

function validateApproval(context, outcome, reviewer, reviewedAt, waiver, expires) {
  if (["passed", "waived"].includes(outcome)) {
    if (!humanReviewer(reviewer)) fail(`${context}: ${outcome}에는 명시적인 사람 검토자가 필요합니다.`);
    if (!validDate(reviewedAt)) fail(`${context}: ${outcome}에는 유효한 YYYY-MM-DD 검토일이 필요합니다.`);
  }
  if (outcome === "waived") {
    if (missingValue(waiver)) fail(`${context}: waived에는 이유와 완화책이 필요합니다.`);
    if (!validDate(expires)) {
      fail(`${context}: waived에는 유효한 YYYY-MM-DD 만료일이 필요합니다.`);
    } else if (expires < new Date().toISOString().slice(0, 10)) {
      fail(`${context}: waiver가 ${expires}에 만료됐습니다.`);
    }
  }
}

function frontmatter(content) {
  if (!content.startsWith("---\n")) return {};
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return {};
  const result = {};
  for (const line of content.slice(4, end).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) result[match[1]] = scalar(match[2]);
  }
  return result;
}

function markdownRows(content, heading) {
  const headingIndex = content.indexOf(heading);
  if (headingIndex === -1) return [];
  const section = content.slice(headingIndex + heading.length).split(/\n##\s/)[0];
  return section
    .split("\n")
    .filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().slice(1, -1).split("|").map((cell) => cell.trim()))
    .filter((row) => row.length > 1 && !row.every((cell) => /^:?-+:?$/.test(cell)));
}

const markdownFiles = walk(root).filter((file) => file.endsWith(".md"));
const documents = new Map();

for (const file of markdownFiles) {
  const rel = relative(file);
  const content = fs.readFileSync(file, "utf8");
  const meta = frontmatter(content);

  for (const match of content.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim();
    if (/^(https?:|mailto:|#)/i.test(rawTarget)) continue;
    const target = rawTarget.split("#")[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (path.relative(root, resolved).startsWith("..")) {
      fail(`${rel}: 저장소 밖을 가리키는 링크 ${rawTarget}`);
    } else if (!fs.existsSync(resolved)) {
      fail(`${rel}: 존재하지 않는 상대 링크 ${rawTarget}`);
    }
  }

  if (!meta.document_id) continue;

  if (documents.has(meta.document_id)) {
    fail(`중복 document_id ${meta.document_id}: ${documents.get(meta.document_id).rel}, ${rel}`);
  }
  documents.set(meta.document_id, { rel, content, meta });

  if (meta.document_id.startsWith("template.") && !meta.template_for) {
    fail(`${rel}: template document에는 template_for가 필요합니다.`);
  }

  if (
    meta.candidate_id &&
    meta.selection_status !== "selected" &&
    meta.status === "active"
  ) {
    fail(`${rel}: 선택되지 않은 candidate 문서는 active일 수 없습니다.`);
  }
}

const indexPath = path.join(root, "docs/DOCUMENT_INDEX.md");
if (!fs.existsSync(indexPath)) {
  fail("docs/DOCUMENT_INDEX.md가 없습니다.");
} else {
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const indexRows = markdownRows(indexContent, "# 문서 색인").filter(
    (row) => row[0] !== "문서 ID" && row.length >= 4
  );
  const indexedIds = new Set();

  for (const [id, canonicalPath, , indexedStatus] of indexRows) {
    if (!id || id === "문서 ID") continue;
    if (indexedIds.has(id)) fail(`문서 색인에 ${id}가 중복 등록됐습니다.`);
    indexedIds.add(id);

    const fullPath = path.join(root, canonicalPath);
    if (!fs.existsSync(fullPath)) {
      fail(`문서 색인의 경로가 없습니다: ${id} → ${canonicalPath}`);
      continue;
    }
    const meta = frontmatter(fs.readFileSync(fullPath, "utf8"));
    if (meta.document_id !== id) {
      fail(`${canonicalPath}: document_id ${meta.document_id ?? "(없음)"}가 색인 ${id}와 다릅니다.`);
    }
    if (meta.status && indexedStatus && meta.status !== indexedStatus) {
      fail(`${canonicalPath}: status ${meta.status}가 색인 ${indexedStatus}와 다릅니다.`);
    }
  }

  for (const [id, document] of documents) {
    if (!indexedIds.has(id)) {
      fail(`${document.rel}: document_id ${id}가 문서 색인에 없습니다.`);
    }
  }
}

const decision = documents.get("governance.decision-log");
const acceptedDecisions = new Map();
const decisionIds = new Set();
const allowedDecisionTypes = new Set([
  "process",
  "scope",
  "customer",
  "architecture",
  "governance",
  "authority",
  "research",
  "selection",
]);
const allowedDecisionStates = new Set(["proposed", "accepted", "superseded", "rejected"]);

if (!decision) {
  fail("governance.decision-log가 없습니다.");
} else {
  const rows = markdownRows(decision.content, "## 결정 목록").filter((row) => row[0] !== "결정 ID");
  for (const row of rows) {
    if (row.length !== 8) {
      fail(`decision log 행은 8열이어야 합니다: ${row.join(" | ")}`);
      continue;
    }
    const [id, date, type, target, state] = row;
    if (!/^D-\d{3}$/.test(id)) fail(`decision log의 잘못된 ID: ${id}`);
    if (decisionIds.has(id)) fail(`decision log에 ${id}가 중복됐습니다.`);
    decisionIds.add(id);
    if (!validDate(date)) fail(`decision log ${id}: 유효하지 않은 날짜 ${date}`);
    if (!allowedDecisionTypes.has(type)) fail(`decision log ${id}: 허용되지 않은 유형 ${type}`);
    if (!allowedDecisionStates.has(state)) fail(`decision log ${id}: 허용되지 않은 상태 ${state}`);
    if (missingValue(target)) fail(`decision log ${id}: 대상 ID가 필요합니다.`);
    if (state === "accepted") acceptedDecisions.set(id, { type, target, row });
  }
}

for (const document of documents.values()) {
  const { rel, meta } = document;
  if (meta.selection_status === "selected") {
    const record = acceptedDecisions.get(meta.selection_decision);
    if (!/^D-\d{3}$/.test(meta.selection_decision ?? "")) {
      fail(`${rel}: selected 문서에는 selection_decision: D-NNN이 필요합니다.`);
    } else if (!record || record.type !== "selection") {
      fail(`${rel}: ${meta.selection_decision}은 accepted selection 결정이 아닙니다.`);
    }
  }
}

const currentStatus = documents.get("planning.current-status");
const selectedIdea = currentStatus?.meta.selected_idea_id;
const selectedSolution = currentStatus?.meta.selected_solution_id;
const selectionDecision = currentStatus?.meta.selection_decision;

if (selectedIdea) {
  if (!/^IDEA-\d{3}$/.test(selectedIdea)) fail(`selected_idea_id 형식 오류: ${selectedIdea}`);
  if (!/^SOL-\d{3}$/.test(selectedSolution ?? "")) {
    fail("selected_idea_id가 있으면 selected_solution_id: SOL-NNN이 필요합니다.");
  }
  const record = acceptedDecisions.get(selectionDecision);
  if (!record || record.type !== "selection") {
    fail("planning.current-status에는 accepted selection_decision이 필요합니다.");
  } else {
    if (!record.target.includes(selectedIdea)) {
      fail(`${selectionDecision}의 대상 ID에 ${selectedIdea}가 없습니다.`);
    }
    if (!record.target.includes(selectedSolution)) {
      fail(`${selectionDecision}의 대상 ID에 ${selectedSolution}가 없습니다.`);
    }
  }
} else if (selectedSolution || selectionDecision) {
  fail("selected_idea_id가 null이면 selected_solution_id와 selection_decision도 null이어야 합니다.");
}

const portfolio = documents.get("planning.idea-portfolio");
const ideaRows = portfolio
  ? markdownRows(portfolio.content, "## 현재 후보").filter((row) => /^IDEA-\d{3}$/.test(row[0]))
  : [];
for (const row of ideaRows) {
  if (row.length !== 6) fail(`idea portfolio ${row[0]} 행은 6열이어야 합니다.`);
}
const selectedIdeaRows = ideaRows.filter((row) => row[5] === "selected");
if (selectedIdea) {
  if (selectedIdeaRows.length !== 1 || selectedIdeaRows[0]?.[0] !== selectedIdea) {
    fail(`idea portfolio에는 ${selectedIdea}만 정확히 한 행 selected여야 합니다.`);
  }
} else if (selectedIdeaRows.length) {
  fail("selected_idea_id가 null인데 idea portfolio에 selected 행이 있습니다.");
}

const solutionPortfolio = documents.get("planning.solution-portfolio");
const solutionRows = solutionPortfolio
  ? markdownRows(solutionPortfolio.content, "## 현재 후보").filter((row) => /^SOL-\d{3}$/.test(row[0]))
  : [];
for (const row of solutionRows) {
  if (row.length !== 8) fail(`solution portfolio ${row[0]} 행은 8열이어야 합니다.`);
}
const selectedSolutionRows = solutionRows.filter((row) => row[6] === "selected");
if (selectedIdea) {
  const row = selectedSolutionRows[0];
  if (selectedSolutionRows.length !== 1 || row?.[0] !== selectedSolution || row?.[1] !== selectedIdea) {
    fail(`solution portfolio에는 ${selectedIdea}/${selectedSolution}만 정확히 한 행 selected여야 합니다.`);
  }
  if (row && !["passed", "waived"].includes(row[5])) {
    fail(`solution portfolio ${selectedSolution}의 Gate 4가 passed 또는 waived여야 합니다.`);
  }
} else if (selectedSolutionRows.length) {
  fail("selected_idea_id가 null인데 solution portfolio에 selected 행이 있습니다.");
}

const prd = documents.get("product.prd");
if (prd?.meta.selection_status === "none" && /^###\s+US-/m.test(prd.content)) {
  fail("선택 아이디어가 없는 product.prd에는 사용자 스토리를 미리 작성할 수 없습니다.");
}

if (selectedIdea) {
  const selectedCanonicalIds = [
    "planning.problem-definition",
    "planning.primary-customer",
    "planning.solution-brief",
    "product.prd",
  ];
  for (const id of selectedCanonicalIds) {
    const document = documents.get(id);
    if (!document) {
      fail(`선택 후 필수 정본 ${id}가 없습니다.`);
      continue;
    }
    const { meta, rel } = document;
    if (meta.status !== "active") fail(`${rel}: 선택 후 status는 active여야 합니다.`);
    if (meta.candidate_id !== selectedIdea) fail(`${rel}: candidate_id가 ${selectedIdea}여야 합니다.`);
    if (meta.selection_status !== "selected") fail(`${rel}: selection_status가 selected여야 합니다.`);
    if (meta.selection_decision !== selectionDecision) {
      fail(`${rel}: selection_decision이 ${selectionDecision}이어야 합니다.`);
    }
    if (["planning.solution-brief", "product.prd"].includes(id) && meta.solution_id !== selectedSolution) {
      fail(`${rel}: solution_id가 ${selectedSolution}여야 합니다.`);
    }
  }
}

const gateLog = documents.get("governance.gate-log");
const allowedOutcomes = new Set(["pending", "partial", "passed", "blocked", "waived"]);
const gateSummary = new Map();
const gateDetails = new Map();
const currentCohortOutcomes = new Map();

if (!gateLog) {
  fail("governance.gate-log가 없습니다.");
} else {
  const summaryRows = markdownRows(gateLog.content, "## 현재 퍼널 요약").filter(
    (row) => row[0] !== "게이트"
  );
  for (const row of summaryRows) {
    if (row.length !== 9) {
      fail(`gate summary 행은 9열이어야 합니다: ${row.join(" | ")}`);
      continue;
    }
    const [gateName, , outcome, , reviewer, reviewedAt, waiver, expires] = row;
    const gateNumber = gateName.match(/^Gate\s+(\d+)$/)?.[1];
    if (!gateNumber) {
      fail(`gate summary의 잘못된 게이트 이름: ${gateName}`);
      continue;
    }
    if (gateSummary.has(gateNumber)) fail(`gate summary에 Gate ${gateNumber}가 중복됐습니다.`);
    if (!allowedOutcomes.has(outcome)) fail(`gate summary Gate ${gateNumber}: 잘못된 판정 ${outcome}`);
    gateSummary.set(gateNumber, outcome);
    validateApproval(`gate summary Gate ${gateNumber}`, outcome, reviewer, reviewedAt, waiver, expires);
  }

  for (const gateNumber of ["0", "1", "2", "3", "4", "5"]) {
    if (!gateSummary.has(gateNumber)) fail(`gate summary에 Gate ${gateNumber}가 없습니다.`);
  }

  const detailRows = markdownRows(gateLog.content, "## 대상별 판정").filter(
    (row) => row[0] !== "대상"
  );
  for (const row of detailRows) {
    if (row.length !== 11) {
      fail(`gate detail 행은 11열이어야 합니다: ${row.join(" | ")}`);
      continue;
    }
    const [entity, gateName, cohort, outcome, , , reviewer, reviewedAt, waiver, expires] = row;
    const gateNumber = gateName.match(/^Gate\s+(\d+)(?:\s|$)/)?.[1];
    if (!gateNumber) {
      fail(`gate detail ${entity}: 잘못된 게이트 이름 ${gateName}`);
      continue;
    }
    const key = `${entity}|${gateNumber}`;
    if (gateDetails.has(key)) fail(`gate detail에 ${entity}/Gate ${gateNumber}가 중복됐습니다.`);
    if (!allowedOutcomes.has(outcome)) fail(`gate detail ${entity}: 잘못된 판정 ${outcome}`);
    if (!["yes", "no"].includes(cohort)) fail(`gate detail ${entity}: 현재 cohort는 yes 또는 no여야 합니다.`);
    gateDetails.set(key, { outcome, cohort });
    if (cohort === "yes") {
      if (!currentCohortOutcomes.has(gateNumber)) currentCohortOutcomes.set(gateNumber, []);
      currentCohortOutcomes.get(gateNumber).push(outcome);
    }
    validateApproval(`gate detail ${entity}/Gate ${gateNumber}`, outcome, reviewer, reviewedAt, waiver, expires);
  }

  for (const [gateNumber, outcomes] of currentCohortOutcomes) {
    let derived;
    if (outcomes.every((outcome) => outcome === "pending")) derived = "pending";
    else if (outcomes.every((outcome) => outcome === "blocked")) derived = "blocked";
    else if (outcomes.every((outcome) => outcome === "passed")) derived = "passed";
    else if (outcomes.every((outcome) => ["passed", "waived"].includes(outcome))) derived = "waived";
    else derived = "partial";
    if (gateSummary.get(gateNumber) !== derived) {
      fail(
        `gate summary Gate ${gateNumber}=${gateSummary.get(gateNumber)}가 current cohort 집계 ${derived}와 다릅니다.`
      );
    }
  }
  for (const [gateNumber, outcome] of gateSummary) {
    if (["passed", "waived"].includes(outcome) && !currentCohortOutcomes.has(gateNumber)) {
      fail(`gate summary Gate ${gateNumber}=${outcome}인데 current cohort 대상별 판정이 없습니다.`);
    }
  }
}

if (currentStatus) {
  const currentGateRows = markdownRows(currentStatus.content, "## 게이트 현황").filter(
    (row) => row[0] !== "게이트"
  );
  const seenCurrentGates = new Set();
  for (const row of currentGateRows) {
    if (row.length !== 4) {
      fail(`planning.current-status gate 행은 4열이어야 합니다: ${row.join(" | ")}`);
      continue;
    }
    const gateNumber = row[0].match(/^Gate\s+(\d+)(?:\s|$)/)?.[1];
    if (!gateNumber) {
      fail(`planning.current-status의 잘못된 게이트 이름: ${row[0]}`);
      continue;
    }
    if (seenCurrentGates.has(gateNumber)) fail(`planning.current-status에 Gate ${gateNumber}가 중복됐습니다.`);
    seenCurrentGates.add(gateNumber);
    if (!gateSummary.has(gateNumber)) {
      fail(`planning.current-status Gate ${gateNumber}에 대응하는 gate summary가 없습니다.`);
    } else if (row[2] !== gateSummary.get(gateNumber)) {
      fail(
        `planning.current-status Gate ${gateNumber}=${row[2]}가 gate summary ${gateSummary.get(gateNumber)}와 다릅니다.`
      );
    }
  }
  for (const gateNumber of ["0", "1", "2", "3", "4", "5"]) {
    if (!seenCurrentGates.has(gateNumber)) fail(`planning.current-status에 Gate ${gateNumber}가 없습니다.`);
  }
}

for (let gateNumber = 1; gateNumber <= 5; gateNumber += 1) {
  if (!["passed", "waived"].includes(gateSummary.get(String(gateNumber)))) continue;
  for (let prerequisite = 0; prerequisite < gateNumber; prerequisite += 1) {
    if (!["passed", "waived"].includes(gateSummary.get(String(prerequisite)))) {
      fail(`Gate ${gateNumber} 통과에는 current cohort Gate ${prerequisite} 통과 또는 waiver가 필요합니다.`);
    }
  }
}

if (selectedIdea) {
  for (const gateNumber of ["0", "1", "2", "3", "4", "5"]) {
    if (!["passed", "waived"].includes(gateSummary.get(gateNumber))) {
      fail(`메인 선택에는 current cohort Gate ${gateNumber}가 passed 또는 waived여야 합니다.`);
    }
  }
  const ideaGate = gateDetails.get(`${selectedIdea}|3`);
  if (ideaGate?.cohort !== "yes" || !["passed", "waived"].includes(ideaGate?.outcome)) {
    fail(`${selectedIdea}의 Gate 3 대상별 판정이 passed 또는 waived여야 합니다.`);
  }
  const solutionGate = gateDetails.get(`${selectedSolution}|4`);
  if (solutionGate?.cohort !== "yes" || !["passed", "waived"].includes(solutionGate?.outcome)) {
    fail(`${selectedSolution}의 Gate 4 대상별 판정이 passed 또는 waived여야 합니다.`);
  }
  const projectGate = gateDetails.get("프로젝트|5");
  if (projectGate?.cohort !== "yes" || !["passed", "waived"].includes(projectGate?.outcome)) {
    fail("프로젝트 Gate 5 대상별 판정이 passed 또는 waived여야 합니다.");
  }
}

if (warnings.length) {
  for (const message of warnings) console.warn(`WARN: ${message}`);
}
if (errors.length) {
  for (const message of errors) console.error(`ERROR: ${message}`);
  console.error(`\n기획 문서 검증 실패: ${errors.length}개 오류`);
  process.exit(1);
}

console.log(`기획 문서 검증 통과: ${documents.size}개 document_id, ${markdownFiles.length}개 Markdown 및 상대 링크`);
