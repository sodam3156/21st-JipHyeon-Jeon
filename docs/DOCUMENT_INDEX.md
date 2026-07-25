---
document_id: repo.document-index
status: active
owner_role: product-owner
last_updated: 2026-07-25
---

# 문서 색인

AI와 팀원은 파일명이 아니라 문서 ID를 기준으로 정본을 찾습니다.

| 문서 ID | 정본 경로 | 목적 | 상태 |
|---|---|---|---|
| repo.start-here | README.md | 프로젝트 진입점 | active |
| repo.ai-instructions | AGENTS.md | AI 작업 규칙 | active |
| repo.collaboration-guide | CONTRIBUTING.md | 사람 중심 협업 규칙 | active |
| repo.document-index | docs/DOCUMENT_INDEX.md | 문서 ID와 정본 경로 | active |
| planning.current-status | docs/00_overview/CURRENT_STATUS.md | 확정·가설·미정·게이트 현황 | active |
| planning.insight-ledger | docs/00_overview/INSIGHT_LEDGER.md | 아이디어 전 설계 인사이트 정본 | active |
| planning.opportunity-map | docs/00_overview/OPPORTUNITY_MAP.md | 문제 원형과 기회 영역 비교 | active |
| planning.problem-definition | docs/01_problem/PROBLEM_DEFINITION.md | D-010으로 선택된 IDEA-002 문제 정본 | active |
| planning.primary-customer | docs/02_customer/PRIMARY_CUSTOMER.md | D-010으로 선택된 IDEA-002 고객 정본 | active |
| planning.idea-portfolio | docs/03_solution/IDEA_PORTFOLIO.md | 아이디어 후보와 선택 게이트 | active |
| planning.solution-portfolio | docs/03_solution/SOLUTION_PORTFOLIO.md | 비교 후보별 최소 솔루션과 Gate 4 정본 | active |
| planning.solution-brief | docs/03_solution/SOLUTION_BRIEF.md | D-010으로 선택된 SOL-002 솔루션 정본 | active |
| validation.research-source-catalog | docs/04_validation/RESEARCH_SOURCE_CATALOG.md | 조사 원천·용도·한계 | active |
| validation.source-snapshot-manifest | docs/04_validation/SOURCE_SNAPSHOT_MANIFEST.md | 외부 조사 원본의 파일 식별자·해시 | active |
| validation.evidence-log | docs/04_validation/EVIDENCE_LOG.md | 고객·문제·솔루션 근거와 반증 | active |
| product.prd | docs/05_product/PRD.md | D-010으로 선택된 SOL-002 구현 정본 | active |
| delivery.hackathon-plan | docs/06_delivery/HACKATHON_PLAN.md | 일정·게이트·데모·발표 계획 | active |
| governance.decision-log | docs/07_decisions/DECISION_LOG.md | 결정과 변경 이유 | active |
| governance.approval-log | docs/07_decisions/APPROVAL_LOG.md | 인간 승인 요청·결과·범위 정본 | active |
| governance.gate-log | docs/07_decisions/GATE_LOG.md | 대상별 게이트 판정·검토·예외 정본 | active |
| ai.agent-framework | docs/08_ai/AGENT_FRAMEWORK.md | 인사이트 기반 에이전트 운영 체계 | active |
| ai.human-authority-matrix | docs/08_ai/HUMAN_AUTHORITY_MATRIX.md | 5인 팀 실행·검토·승인·차단 권한 정본 | active |
| ai.agent-task-queue | docs/08_ai/AGENT_TASK_QUEUE.md | 에이전트 질문·선행조건·상태 | active |
| ai.prompt-playbook | docs/08_ai/PROMPT_PLAYBOOK.md | 단계별 재사용 프롬프트 | active |
| agent-run.AR-001 | docs/08_ai/runs/AR-001.md | 조사 원천 분류 실행 기록 | done |
| agent-run.AR-002 | docs/08_ai/runs/AR-002.md | 인사이트 합성·반론 실행 기록 | done |
| agent-run.AR-011 | docs/08_ai/runs/AR-011.md | 돌봄 인사이트의 최소 사건·솔루션·반증 설계 | review |
| template.insight-card | templates/INSIGHT_CARD.md | 인사이트 제안 양식 | active |
| template.opportunity-brief | templates/OPPORTUNITY_BRIEF.md | 기회 영역 양식 | active |
| template.idea-card | templates/IDEA_CARD.md | 아이디어 후보 양식 | active |
| template.solution-card | templates/SOLUTION_CARD.md | 비교 후보별 최소 솔루션 양식 | active |
| template.agent-run | templates/AGENT_RUN.md | 에이전트 실행 기록 양식 | active |
| template.approval-packet | templates/APPROVAL_PACKET.md | 인간 승인 요청·결과 기록 양식 | active |
| template.interview-note | templates/INTERVIEW_NOTE.md | 인터뷰 기록 양식 | active |
| template.experiment-card | templates/EXPERIMENT_CARD.md | 검증 실험 양식 | active |
| template.decision-record | templates/DECISION_RECORD.md | 주요 결정 양식 | active |

## 변경 원칙

- 정본 경로가 바뀌면 이 색인을 먼저 수정하고 같은 Pull Request에서 참조를 갱신합니다.
- 새 문서를 만들기 전에 같은 목적의 문서 ID가 있는지 확인합니다.
- 정본 상태는 draft, active, superseded, archived 중 하나를 사용합니다.
- 실행 기록은 ready, running, blocked, review, done, cancelled를 사용할 수 있습니다.
- superseded 문서는 대체 문서 ID를 본문 상단에 명시합니다.
- 아이디어별 초안은 `planning.idea-portfolio`에 먼저 등록하고, 선택 전에는 frontmatter의 `candidate_id`, `selection_status: not_selected`와 본문 상단 경고로 후보임을 표시합니다.

## 외부 정본

| 문서 ID | 외부 정본 경로 | 저장소 내 식별자 | 접근 제한 |
|---|---|---|---|
| sejong-ax.problem-bank | `01_세종_AX_해커톤/02_문제발굴_리서치/세종_구체적_문제_1000개_누적본.md` | validation.source-snapshot-manifest | ChatGPT Library 접근 필요 |
