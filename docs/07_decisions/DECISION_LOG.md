---
document_id: governance.decision-log
status: active
owner_role: product-owner
last_updated: 2026-07-25
---

# 결정 기록

상태는 proposed, accepted, superseded, rejected 중 하나를 사용합니다. 유형은 process, scope, customer, architecture, governance, authority, research, selection 중 하나를 사용합니다. `selection` 행은 대상 ID에 선택한 IDEA와 SOL을 모두 적습니다.

## 결정 목록

| 결정 ID | 날짜 | 유형 | 대상 ID | 상태 | 결정 | 이유 | 영향 문서 |
|---|---|---|---|---|---|---|---|
| D-001 | 2026-07-22 | process | project | accepted | 고객 → 문제 → 해결 범위 → 기술 → UX 순서로 기획한다 | 범위 과대와 기능 선행 방지 | problem, customer, solution |
| D-002 | 2026-07-22 | scope | project | accepted | 관광객·이주민·대학생을 동시에 주요 고객으로 삼지 않는다 | 문제 강도와 접근성을 검증하기 어려움 | current-status, problem |
| D-003 | 2026-07-24 | customer | HYP-001, IDEA-001 | proposed | 1차 고객을 무차량 고려대 세종캠퍼스 모임 제안자로 둔다 | 비교 검증을 위한 구체 seed 가설 | customer, problem, IDEA-001 |
| D-004 | 2026-07-24 | architecture | project | accepted | 선택된 후보가 멀티 관점·집현전 표현을 채택하더라도 실제 멀티에이전트 구현을 P0로 두지 않는다 | 표현 방식이 아직 선택하지 않은 문제·아이디어를 미리 제한하지 않게 함 | solution, PRD |
| D-005 | 2026-07-24 | governance | repository | accepted | 문서 ID별 단일 정본과 Pull Request 협업을 사용한다 | 사람과 여러 AI 사이의 중복·모순 방지 | repository-wide |
| D-006 | 2026-07-24 | governance | project | accepted | 메인 아이디어는 인사이트·기회·반론·실험 게이트와 사람의 결정 전에는 선택하지 않는다 | 아이디어에 맞춘 사후 근거와 조기 고착 방지 | current-status, insight, opportunity, portfolio, agents |
| D-007 | 2026-07-24 | authority | project | accepted | AI 에이전트는 조사·초안·비교·검증을 수행하되 메인 아이디어 선택·병합·배포·외부 제출은 사람이 승인한다 | 판단 책임과 가역성 유지 | AGENTS, agent-framework |
| D-008 | 2026-07-24 | research | E-004, E-005, E-006 | accepted | 해커톤 전략 자료와 백엔드 기술 자료를 고객 문제의 직접 근거로 사용하지 않는다 | 원천 용도 혼합과 거짓 확신 방지 | source-catalog, evidence-log, insight-ledger |
| D-009 | 2026-07-25 | scope | OPP-005, IDEA-002, X-006 | proposed | 6–36개월·평일·2–4시간 공식 시간제보육 실행 라우터를 48시간 challenger로 검증하고, 통과 시 현재 비교군의 가장 약한 한 영역과 교체할지 결정한다 | 사용자 인사이트를 대표 사건으로 좁히되 최근 행동·운영자·데이터 공백과 공급 비보장 반론을 먼저 검증 | opportunity-map, idea-portfolio, solution-portfolio, evidence-log, current-status, agent queue |

## 변경 방법

1. `template.decision-record`로 제안합니다.
2. 대안, 근거, 반증, 영향을 적습니다.
3. 유형과 대상 ID를 채우고 책임자가 상태를 accepted 또는 rejected로 바꿉니다.
4. accepted라면 관련 정본을 같은 Pull Request에서 수정합니다.
5. 기존 결정을 대체하면 이전 항목을 superseded로 바꾸고 새 결정 ID를 연결합니다.

## 메인 아이디어 선택 조건

- 현재 cohort의 Gate 0과 Gate 1 통과 또는 명시적 waiver
- Gate 2를 통과한 기회 영역 최소 2개
- Gate 3을 통과하고 독립 반론을 거친 아이디어 후보
- 비교 후보별 최소 솔루션의 Gate 4 통과
- 같은 정보량·평가표로 비교한 후보
- 후보별 치명 가정과 실제 검증 결과
- 데이터·권리·안전·3분 발표 안의 90초 핵심 데모 경계
- 제품 책임자의 accepted D-ID

## 미해결 결정

- D-003 주요 고객 가설과 IDEA-001 유지 여부
- OPP-001–003 중 먼저 검증할 두 영역
- D-009와 HD-002: OPP-005 challenger 진입, P0 사건 고정, 통과 시 비교군 교체 여부
- 2026-07-28까지 메인 아이디어를 선택할 수 있는지와, 근거 부족 시 범위 축소 또는 시한 예외 승인 여부
- 선택 후 집현전 캐릭터의 수와 역할
- 선택 후 실제 데이터와 합성 데이터의 데모 범위
