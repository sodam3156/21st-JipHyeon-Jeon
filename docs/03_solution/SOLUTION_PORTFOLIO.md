---
document_id: planning.solution-portfolio
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# 솔루션 포트폴리오

이 문서는 독립 반론을 통과한 아이디어를 **같은 깊이의 최소 솔루션**으로 비교하고 Gate 4를 판정하는 정본입니다. 메인 아이디어 선택 전에는 후보별 PRD를 만들지 않습니다.

## 진입 조건

솔루션 카드는 아래 조건을 모두 충족한 IDEA에만 만듭니다.

1. 연결 OPP가 Gate 2를 통과했습니다.
2. IDEA가 Gate 3을 통과했습니다.
3. 독립 Red Team이 즉시 탈락 조건을 검사했습니다.
4. 같은 비교군의 다른 후보에도 동일한 시간·정보·형식을 적용할 수 있습니다.

## 현재 후보

아직 Gate 4 비교 후보가 없습니다.

후보 상태는 `candidate`, `selected`, `rejected`, `parked` 중 하나를 사용합니다.

| 솔루션 ID | 아이디어 ID | 기회 ID | 대표 사건 | 치명 공백 | Gate 4 | 후보 상태 | 검토자·일자 |
|---|---|---|---|---|---|---|---|
| - | - | - | - | - | - | - | - |

`SOL-001`은 Gate 도입 전에 IDEA-001을 구체화했던 archived 기록이므로 현재 비교표에 넣지 않습니다.

## 후보별 카드 필드

AR-009는 비교 후보마다 `template.solution-card` 형식의 절을 이 문서에 추가합니다.

- SOL·IDEA·OPP·IN·E·X 연결
- 구체 고객과 대표 사건 하나
- 이전 상태와 목표 상태
- `이벤트 → 판단 → 도구 → 결과물 → 다음 행동` 수직 흐름
- P0·P1·제외 범위
- 입력·출력·데이터 출처·시점·결측 계약
- AI·규칙·사람의 책임과 승인·중단 경계
- timeout·429·형식 오류·stale data·오프라인 축소 모드
- 3분 발표 안의 90초 핵심 데모
- 수용 기준과 순수 제작시간 추정
- 치명 가정·반증 실험·남은 위험

## AR-009 실행 계약

1. Red Team 후 남은 최대 세 후보를 입력으로 받습니다.
2. 후보마다 같은 시간 상한과 카드 필드를 적용합니다.
3. 한 후보만 상세화하거나 브랜드·캐릭터를 먼저 확정하지 않습니다.
4. 후보별 SOL-ID와 Gate 4 행을 `governance.gate-log`에 추가합니다.
5. Gate 4 판정은 후보별로 따로 내리고 사람 검토자·검토일을 기록합니다.
6. 비교 후보 전체의 카드와 게이트 변경을 한 Pull Request에 담습니다.

## 선택 후 전환

제품 책임자가 accepted D-ID로 메인 아이디어를 선택하면:

1. 선택한 SOL의 내용을 `planning.solution-brief` 정본으로 옮기고 `status: active`, `selection_status: selected`, `selection_decision: D-NNN`을 기록합니다.
2. 선택한 SOL은 `selected`, 선택하지 않은 SOL은 `rejected` 또는 `parked`로 유지합니다.
3. 선택한 문제·고객·PRD·일정 정본을 같은 Pull Request에서 채웁니다.
4. 기존 archived SOL-001의 내용은 Git 이력으로만 보존합니다.
