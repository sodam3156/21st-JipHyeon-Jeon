---
document_id: governance.decision-log
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# 결정 기록

상태는 proposed, accepted, superseded, rejected 중 하나를 사용합니다.

## 결정 목록

| 결정 ID | 날짜 | 상태 | 결정 | 이유 | 영향 문서 |
|---|---|---|---|---|---|
| D-001 | 2026-07-22 | accepted | 고객 → 문제 → 해결 범위 → 기술 → UX 순서로 기획한다 | 멘토 피드백과 기존 범위 과대 문제 | problem, customer, solution |
| D-002 | 2026-07-22 | accepted | 관광객·이주민·대학생을 동시에 주요 고객으로 삼지 않는다 | 문제 강도와 접근성을 검증하기 어려움 | current-status, problem |
| D-003 | 2026-07-24 | proposed | 1차 고객을 무차량 고려대 세종캠퍼스 모임 제안자로 둔다 | 팀 접근성과 대학생 공감 가능성 | customer, problem |
| D-004 | 2026-07-24 | accepted | 멀티 관점·집현전 표현은 유지하되 실제 멀티에이전트 구현을 P0로 두지 않는다 | 해커톤 구현 가능성과 가치 설명 우선 | solution, PRD |
| D-005 | 2026-07-24 | accepted | 문서 ID별 단일 정본과 Pull Request 협업을 사용한다 | 사람과 여러 AI 사이의 중복·모순 방지 | repository-wide |

## 변경 방법

1. templates/DECISION_RECORD.md로 제안합니다.
2. 대안, 근거, 반증, 영향을 적습니다.
3. 책임자가 상태를 accepted 또는 rejected로 바꿉니다.
4. accepted라면 관련 정본을 같은 Pull Request에서 수정합니다.
5. 기존 결정을 대체하면 이전 항목을 superseded로 바꾸고 새 결정 ID를 연결합니다.

## 미해결 결정

- D-003 주요 고객 가설 유지 여부
- 참여자 링크 수집을 P0에 포함할지 여부
- 데모에 사용할 장소·교통 데이터 범위
- 집현전 캐릭터의 수와 역할

