---
document_id: ai.agent-task-queue
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# AI 에이전트 작업 큐

이 문서는 에이전트가 다음에 수행할 질문과 게이트를 관리합니다. 상태는 `ready`, `running`, `blocked`, `review`, `done`, `cancelled` 중 하나입니다.

## 현재 큐

| 실행 ID | 단계 | 질문 | 입력 | 담당 역할 | 권한 | 인간 책임자 | 승인 ID | 완료 조건 | 결과 | 상태 |
|---|---|---|---|---|---|---|---|---|---|---|
| AR-001 | source | 제공된 17개 조사 파일의 사용 범위와 한계는 무엇인가? | RS-STR-001–006, RS-PB-001, RS-BE-001–010 | Source Curator | A | 기획QA | - | 원천 목록·용도·한계 등록 | [실행 기록](runs/AR-001.md) | done |
| AR-002 | insight | 중복을 제거하면 어떤 설계 제약이 남는가? | AR-001, E-004–006, HYP-001, SJ-P-0001–0029 | Insight Synthesizer, Red Team | A | 기획QA | - | IN-001–020과 반박 조건 | [실행 기록](runs/AR-002.md) | done |
| AR-003 | opportunity | OPP-001–003 중 어떤 두 영역을 48시간 검증할 것인가? | IN-001·002·003·006·008·011·015·016·020, OPP-001–003 | Opportunity Mapper, Judge | D | 팀장PM | HD-001 | 같은 기준 비교, 영역별 실험, 상위 두 영역 추천 | - | ready |
| AR-004 | evidence | OPP-001의 정시 이동 문제는 현재 고객 행동에서 얼마나 강한가? | SJ-P-0026, SJ-P-0006, SJ-P-0001 | Experiment Designer, 사람 인터뷰어 | C | 기획QA | - | 최근 행동 6건과 실패·보류 기준 | - | blocked |
| AR-005 | evidence | OPP-002의 문화 문제는 발견이 아니라 콘텐츠 생성·실행 문제인가? | SJ-P-0022, SJ-P-0023, SJ-P-0024 | Experiment Designer, 사람 인터뷰어 | C | 기획QA | - | 청년 5명·운영자 2명의 행동 증거 | - | blocked |
| AR-006 | evidence | OPP-003의 행사 종료 문제는 재사용·도입 주체를 가질 수 있는가? | SJ-P-0025 | Opportunity Mapper, Experiment Designer | C | 기획QA | - | 방문객 3명·운영자 1명의 흐름 | - | blocked |
| AR-007 | idea | 검증 상위 두 기회에서 어떤 서로 다른 해결 원리가 가능한가? | AR-003과 선택된 AR-004–006 두 개의 결과 | Ideator | B | 팀장PM·기획QA | - | 영역별 최대 2개, 총 최대 4개 아이디어 카드 | - | blocked |
| AR-008 | red-team | 생성된 아이디어의 치명 반례는 무엇인가? | AR-007 | Red Team | B | 기획QA·백엔드보안·프론트UX | - | 근거 오류·탈락 조건·최소 반증 실험, 비교 후보 최대 3개 | - | blocked |
| AR-009 | solution | 반론을 통과한 각 후보의 최소 end-to-end 흐름은 무엇인가? | AR-008 | Solution Architect | D | 백엔드보안·프론트UX·팀장PM | - | 최대 3개 후보의 SOL 카드·P0·계약·승인·실패 경로·3분 발표 안의 90초 핵심 데모·Gate 4 판정 | - | blocked |
| AR-010 | decision | 어느 후보를 메인 아이디어로 선택할 것인가? | AR-003, 선택된 AR-004–006 두 개, AR-007–009, 실험 결과 | Judge, 제품 책임자 | D | 팀장PM | - | D-ID와 연관 정본 동시 변경 | - | blocked |

## 실행 claim

동시에 같은 AR을 수정하지 않도록 실행 시작 전에 아래를 채웁니다. `claimed_by`는 사람 또는 에이전트 식별자이며, 아직 시작하지 않은 행은 `-`로 둡니다.

| 실행 ID | depends_on | claimed_by | claimed_at | base_commit | reviewer |
|---|---|---|---|---|---|
| AR-001 | - | Codex | 2026-07-24 | c1262bb | AI cross-audit; human pending |
| AR-002 | AR-001 | Codex | 2026-07-24 | c1262bb | AI cross-audit; human pending |
| AR-003 | AR-001, AR-002 | - | - | - | 제품 책임자 |
| AR-004 | AR-003에서 OPP-001 선택 | - | - | - | 미지정 |
| AR-005 | AR-003에서 OPP-002 선택 | - | - | - | 미지정 |
| AR-006 | AR-003에서 OPP-003 선택 | - | - | - | 미지정 |
| AR-007 | AR-003, 선택된 AR-004–006 두 개, 두 Gate 2 passed | - | - | - | 제품 책임자 |
| AR-008 | AR-007 | - | - | - | 제품 책임자와 생성 세션과 다른 Red Team |
| AR-009 | AR-008 | - | - | - | 기술 검토자 |
| AR-010 | AR-003, 선택된 AR-004–006 두 개, AR-007–009, 실험 결과 | - | - | - | 제품 책임자 |

## 차단 해제 조건

- AR-003 종료 후 제품 책임자가 상위 두 영역을 승인합니다.
- 선택된 두 영역의 AR-004–006만 `ready`로 바꾸고, 선택하지 않은 행은 `cancelled` 또는 다음 검토까지 `blocked`로 둡니다.
- AR-004: OPP-001 선택, 실제 통근·통학 대상자 모집과 인터뷰 일정
- AR-005: OPP-002 선택, 최근 세종 밖 문화 원정 경험자와 소규모 행사 운영자 모집
- AR-006: OPP-003 선택, 중앙공원 대형행사 출차 경험자와 운영 측 접촉
- AR-007 이후: 선택된 두 행동 검증이 `done`이고 두 기회 영역이 Gate 2를 통과

## AR-003 권장 작업 봉투

```yaml
run_id: AR-003
stage: opportunity
question: "OPP-001, OPP-002, OPP-003 중 어떤 두 영역을 먼저 48시간 검증해야 하는가?"
authority_class: D
human_owner: 팀장PM
approval_id: HD-001
input_ids:
  - planning.insight-ledger
  - planning.opportunity-map
  - IN-001
  - IN-002
  - IN-003
  - IN-006
  - IN-008
  - IN-011
  - IN-015
  - IN-016
  - IN-020
forbidden_actions:
  - select_main_idea
  - change_prd
  - merge
budget:
  max_candidates: 3
  max_tool_calls: 15
  max_retries_per_action: 1
  deadline_minutes: 25
required_output:
  - same-rubric comparison
  - fatal assumption per opportunity
  - 48-hour experiment per opportunity
  - top-two recommendation with uncertainty
  - human decision question
```

## 큐 갱신 규칙

1. 한 실행은 질문 하나만 가집니다.
2. 선행 작업이 `done`이 아니면 후속 작업을 `ready`로 바꾸지 않습니다.
3. `done`에는 결과 문서 ID 또는 링크, 검증, 수정 문서 ID가 필요합니다.
4. 사람 인터뷰·기관 확인이 필요한 작업은 AI가 임의로 완료 처리하지 않습니다.
5. 메인 아이디어 선택은 AR-010과 D-ID 없이 이루어지지 않습니다.
6. `claimed_by`, `claimed_at`, `base_commit`, `reviewer`를 채운 뒤 실행하며 작업을 넘기면 claim을 명시적으로 갱신합니다.
7. 모든 실행은 권한 등급과 인간 책임자를 가집니다.
8. D·E 작업은 연결된 HD-ID가 `governance.approval-log`에서 `approve`이기 전에는 `done`으로 바꾸지 않습니다.
9. C 작업은 실제 인간 실행 근거 없이 `done`으로 바꾸지 않습니다.
