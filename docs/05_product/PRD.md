---
document_id: product.prd
status: draft
owner_role: planner
last_updated: 2026-07-24
candidate_id: null
selection_status: none
selection_decision: null
solution_id: null
implementation_status: blocked
---

# 제품 요구사항 문서 — 선택 대기

> 메인 아이디어가 선택되지 않았으므로 이 PRD는 의도적으로 비워 둡니다. seed나 explore 후보의 기능을 이 문서에 미리 적지 않습니다.

## 현재 상태

- 선택 아이디어: 없음
- 선택 결정: 없음
- 구현 상태: blocked
- 목표 선택일: 2026-07-28

## 작성 시작 조건

아래 조건을 모두 만족한 Pull Request에서만 이 문서를 채웁니다.

1. 최소 두 기회 영역이 Gate 2를 통과합니다.
2. 비교 후보가 Gate 3과 독립 반론을 통과합니다.
3. 선택 후보의 최소 솔루션이 Gate 4를 통과합니다.
4. 치명 가정의 실제 검증 결과가 있습니다.
5. 제품 책임자가 accepted D-ID로 메인 아이디어를 선택합니다.
6. `candidate_id`, `solution_id`, `selection_decision`을 같은 변경에서 연결합니다.

## 선택 후 필수 절

- 구체 고객·촉발 상황·현재 실패
- 대표 사건 하나와 목표 상태 변화
- P0·P1·제외 범위
- 사용자 스토리와 검증 가능한 수용 기준
- 데이터 출처·시점·결측·오류 계약
- AI·규칙·사람의 책임과 승인 경계
- 3분 발표 안의 90초 핵심 데모
- timeout·429·형식 오류·stale data·오프라인 축소 모드
- 성공 지표와 반증 조건

기술 위험만 확인하는 spike는 이 PRD를 채우지 않고 별도 X-ID로 진행합니다.
