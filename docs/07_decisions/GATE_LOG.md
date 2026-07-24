---
document_id: governance.gate-log
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# 게이트 판정 기록

이 문서는 각 대상의 단계 승격 여부를 한곳에서 관리하는 정본입니다. 설명 문서에 `passed`라고 적는 것만으로 상태가 바뀌지 않습니다.

현재 판정표는 1차 비교군 OPP-001–003과 실제로 다음 게이트 판정을 요청한 대상을 관리합니다. OPP-004–007은 `planning.opportunity-map`의 탐색·보류 목록에만 있으며 Gate 2 판정 대상에 아직 진입하지 않았습니다. 우선 비교군에 넣을 때 판정 행을 먼저 추가합니다.

## 상태와 판정 규칙

- `pending`: 아직 판정하지 않음
- `partial`: 조건 일부만 충족했으며 다음 단계로 승격하지 않음
- `passed`: 조건 전체와 검토자·검토일이 기록됨
- `blocked`: 치명 공백이나 선행조건 미충족으로 진행 중단
- `waived`: 제품 책임자가 이유·만료일·완화책을 기록해 한시적으로 예외 승인

`passed`와 `waived`에는 사람 검토자와 검토일이 필요합니다. `waived`에는 예외 이유, 완화책, 만료일이 모두 필요하며 만료 후 자동으로 `blocked`로 간주합니다. 의견이 갈리고 정해진 시각까지 해소되지 않으면 더 작은 범위 또는 `blocked`를 선택합니다.

`partial` 대상은 다음 상태로 승격할 수 없지만, 공백을 닫기 위한 읽기·비교·실험 설계처럼 가역적인 discovery 작업은 수행할 수 있습니다. 따라서 AR-003은 Gate 2를 통과시키는 실행이 아니라 검증할 두 영역과 실험을 추천하는 작업이며, 사람 검토와 행동 근거 없이 기회·아이디어 상태를 올릴 수 없습니다.

## 현재 퍼널 요약

과거·보류 대상의 판정이 현재 퍼널을 막지 않도록, `planning.current-status`는 아래 요약 행만 따릅니다. `현재 cohort`가 바뀌면 대상별 판정을 지우지 말고 이 표의 범위와 근거를 갱신합니다.

| 게이트 | 현재 cohort | 판정 | 지지 근거 | 검토자 | 검토일 | 예외 이유·완화책 | 만료일 | 다음 상태·행동 |
|---|---|---|---|---|---|---|---|---|
| Gate 0 | RS-STR-001–006, RS-PB-001, RS-BE-001–010 | partial | 원천 목록·해시·용도 경계 완료, 사람 표본 검토 전 | AI synthesis; human pending | 2026-07-24 | - | - | 제품 책임자 표본 검토 |
| Gate 1 | IN-001–020 | partial | 관찰·유형·반박 조건 완료, 사람 검토와 고객 행동 보강 전 | AI synthesis; human pending | 2026-07-24 | - | - | 사용할 IN cohort와 사람 검토자 확정 |
| Gate 2 | OPP-001, OPP-002, OPP-003 | pending | AR-003과 행동 검증 전 | - | - | - | - | 검증할 두 OPP 선택 |
| Gate 3 | 없음; IDEA-001 seed는 미진입 | pending | Portfolio 비교 후보 없음 | - | - | - | - | Gate 2 통과 후 후보 생성 |
| Gate 4 | 없음; SOL-001 legacy archive는 제외 | blocked | Gate 3 통과 비교 후보 없음 | - | - | - | - | AR-009에서 후보별 SOL 카드 작성 |
| Gate 5 | 프로젝트 | blocked | Gate 2–4, 실제 검증, selection D-ID 없음 | - | - | - | - | 2026-07-28까지 선택 또는 범위 축소·예외 결정 |

## 대상별 판정

| 대상 | 게이트 | 현재 cohort | 판정 | 지지 근거 | 반박·공백 | 검토자 | 검토일 | 예외 이유·완화책 | 만료일 | 다음 상태·행동 |
|---|---|---|---|---|---|---|---|---|---|---|
| RS-STR-001–006, RS-PB-001, RS-BE-001–010 | Gate 0 원천 위생 | yes | partial | validation.research-source-catalog, validation.source-snapshot-manifest, AR-001 | 외부 원본의 사람 표본 재검토가 없음 | AI synthesis; human pending | 2026-07-24 | - | - | 제품 책임자가 원천 표본과 용도 경계를 검토 |
| IN-001–020 | Gate 1 인사이트 승인 | yes | partial | OBS-001–020, AR-002, 반박 조건 | 사람 검토 전이며 IN-015–017은 최근 행동 검증 전 qualified | AI synthesis; human pending | 2026-07-24 | - | - | 제품 책임자 검토 후 개별 인사이트 유지·수정·폐기 |
| OPP-001 | Gate 2 기회 영역 승인 | yes | pending | SJ-P-0001, SJ-P-0002, SJ-P-0005, SJ-P-0006, SJ-P-0014, SJ-P-0026; IN 연결 | 최근 행동·대안 실패·손실·데이터 가능성 검증 전 | - | - | - | - | AR-003에서 선택 시 AR-004 실행 |
| OPP-002 | Gate 2 기회 영역 승인 | yes | pending | SJ-P-0022, SJ-P-0023, SJ-P-0024, SJ-P-0028; IN 연결 | 콘텐츠 실행 문제인지, 단순 발견 문제인지 검증 전 | - | - | - | - | AR-003에서 선택 시 AR-005 실행 |
| OPP-003 | Gate 2 기회 영역 승인 | yes | pending | SJ-P-0025; IN 연결 | 재사용 빈도·운영자·실제 흐름 데이터 검증 전 | - | - | - | - | AR-003에서 선택 시 AR-006 실행 |
| IDEA-001 | Gate 3 아이디어 등록 | no | pending | seed 이름·문장·연결 시도·치명 공백 기록 | Portfolio 진입 조건 미충족; `seed`는 Gate 3 판정 대상에 미진입 | - | - | - | - | seed 유지·보류·폐기 결정 |
| SOL-001 | Gate 4 솔루션 구체화 | no | blocked | 역사적 초안은 Git 이력에 보존 | IDEA-001이 Gate 2·3 미통과, 현재 문서 archived | - | - | - | - | 선택 전 재개 금지 |
| 프로젝트 | Gate 5 메인 아이디어 선택 | yes | blocked | 선택 절차와 목표일은 정의됨 | Gate 2–4와 실제 검증, accepted D-ID 없음 | - | - | - | - | 2026-07-28까지 선택 또는 범위 축소·예외 결정 |

## 판정 변경 계약

게이트 판정을 바꾸는 Pull Request는 다음을 함께 수정합니다.

1. 대상별 판정 행
2. 지지 근거와 반박 근거의 정본
3. 영향을 받는 큐 상태
4. 상태 승격이 주요 방향을 바꾸면 D-ID
5. `passed` 또는 `waived`의 사람 검토자·검토일
6. 현재 cohort가 바뀌면 현재 퍼널 요약 행
7. 대상별 `현재 cohort`를 yes/no로 명시해 과거 blocked·pending 행과 현재 판정을 분리

AI는 판정 변경안을 제안할 수 있지만 사람 검토자를 대신 입력하지 않습니다.
