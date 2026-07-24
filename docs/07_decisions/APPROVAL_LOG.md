---
document_id: governance.approval-log
status: active
owner_role: product-owner
last_updated: 2026-07-25
---

# 인간 승인 로그

권한 D·E 작업과 주요 B·C 검토의 요청·결과를 기록합니다. 실제 사람의 응답이 없으면 상태를 `approve`로 바꾸지 않습니다.

## 승인 목록

| 승인 ID | 연결 실행 | 결정 질문 | 권한 등급 | 책임자 | 상태 | 실제 승인자 | 승인일 | 범위·조건 | 승인 패킷·근거 |
|---|---|---|---|---|---|---|---|---|---|
| HD-001 | AR-003 | OPP-001–003 중 48시간 검증할 두 영역을 승인할 것인가? | D | 팀장PM | pending | - | - | AR-003 결과와 같은 기준 비교 검토 후 결정 | template.approval-packet으로 작성 예정 |

## 상태

- `pending`: 승인 요청 준비 또는 응답 대기
- `approve`: 명시된 범위로 승인
- `revise`: 수정 후 재요청
- `reject`: 거절
- `defer`: 기한 또는 조건까지 보류
- `expired`: 승인 범위 또는 기한 만료

## 기록 규칙

1. 승인 ID는 `HD-NNN` 형식을 사용하고 재사용하지 않습니다.
2. D·E 작업은 작업 큐가 `done`이 되기 전에 연결 승인 ID가 `approve`여야 합니다.
3. 승인자는 `ai.human-authority-matrix`의 책임자 또는 명시적으로 등록된 대체 승인자여야 합니다.
4. 입력·P0·데이터·권한 범위가 바뀌면 기존 승인을 확대 해석하지 않고 새 승인 또는 재승인을 기록합니다.
5. 승인 패킷이 Issue나 별도 문서에 있으면 실제 링크를 근거 칸에 남깁니다.
