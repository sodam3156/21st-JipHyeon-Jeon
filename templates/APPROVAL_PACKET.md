---
document_id: template.approval-packet
status: active
owner_role: product-owner
last_updated: 2026-07-25
template_for: human-approval
---

# 인간 승인 패킷 템플릿

## 승인 요청

| 항목 | 내용 |
|---|---|
| 승인 ID | HD-NNN |
| 연결 실행 | AR-NNN |
| 연결 결정·실험 | D-NNN / X-NNN / - |
| 결정 질문 | 한 문장 |
| 권한 등급 | B / C / D / E |
| 1차 승인자 | 팀장PM / 기획QA / 백엔드보안 / 프론트UX / 비주얼디자인 |
| 추가 승인자 | 이름 또는 - |
| 응답 기한 | YYYY-MM-DD HH:MM KST |
| 미응답 시 | blocked / review 유지 |

## 선택지와 추천

| 선택지 | 기대 효과 | 위험·비용 | 지지 근거 | 반박 근거 |
|---|---|---|---|---|
| A |  |  |  |  |
| B |  |  |  |  |
| C |  |  |  |  |

**AI 추천:**

**추천 이유:**

**확신도:** low / medium / high

## 승인 범위

- 승인하면 가능한 변경:
- 승인에 포함되지 않는 변경:
- 입력·P0·데이터·권한이 바뀌면 재승인이 필요한 조건:
- 자동 만료 또는 재검토일:

## 결과 기록

| 승인자 | 날짜 | 결과 | 조건·수정 요청 |
|---|---|---|---|
| 실제 사람 이름 | YYYY-MM-DD | approve / revise / reject / defer |  |

## 반영 확인

- [ ] `governance.approval-log`에 기록됨
- [ ] 연결 AR 상태가 승인 결과와 일치함
- [ ] 관련 gate·결정·현재 상태가 동시에 갱신됨
- [ ] 승인 범위를 벗어난 작업이 자동 실행되지 않음
