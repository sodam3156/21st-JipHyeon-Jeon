---
document_id: repo.document-index
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# 문서 색인

AI와 팀원은 파일명이 아니라 문서 ID를 기준으로 정본을 찾습니다.

| 문서 ID | 정본 경로 | 목적 | 상태 |
|---|---|---|---|
| repo.start-here | README.md | 프로젝트 진입점 | active |
| repo.ai-instructions | AGENTS.md | AI 작업 규칙 | active |
| repo.collaboration-guide | CONTRIBUTING.md | 사람 중심 협업 규칙 | active |
| planning.current-status | docs/00_overview/CURRENT_STATUS.md | 확정·가설·미정 현황 | active |
| planning.problem-definition | docs/01_problem/PROBLEM_DEFINITION.md | 핵심 문제 정본 | active |
| planning.primary-customer | docs/02_customer/PRIMARY_CUSTOMER.md | 주요 고객 정본 | active |
| planning.solution-brief | docs/03_solution/SOLUTION_BRIEF.md | 가치 제안과 MVP 경계 | active |
| validation.evidence-log | docs/04_validation/EVIDENCE_LOG.md | 근거와 반증 기록 | active |
| product.prd | docs/05_product/PRD.md | 구현 요구사항과 수용 기준 | draft |
| delivery.hackathon-plan | docs/06_delivery/HACKATHON_PLAN.md | 일정·데모·발표 계획 | active |
| governance.decision-log | docs/07_decisions/DECISION_LOG.md | 결정과 변경 이유 | active |
| ai.prompt-playbook | docs/08_ai/PROMPT_PLAYBOOK.md | 반복 가능한 AI 프롬프트 | active |
| template.interview-note | templates/INTERVIEW_NOTE.md | 인터뷰 기록 양식 | active |
| template.experiment-card | templates/EXPERIMENT_CARD.md | 검증 실험 양식 | active |
| template.decision-record | templates/DECISION_RECORD.md | 주요 결정 양식 | active |

## 변경 원칙

- 정본 경로가 바뀌면 이 색인을 먼저 수정하고 같은 Pull Request에서 참조를 갱신합니다.
- 새 문서를 만들기 전에 같은 목적의 문서 ID가 있는지 확인합니다.
- 상태 값은 draft, active, superseded, archived 중 하나를 사용합니다.
- superseded 문서는 대체 문서 ID를 본문 상단에 명시합니다.

