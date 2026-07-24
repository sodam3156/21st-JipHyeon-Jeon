---
document_id: repo.start-here
status: active
owner_role: product-owner
last_updated: 2026-07-24
---

# 21세기 집현전

2026 세종 AX 해커톤을 위한 기획·검증·개발 협업 저장소입니다.

이 저장소의 목표는 아이디어를 많이 쌓는 것이 아니라, 한 명의 주요 고객과 하나의 핵심 문제를 검증하고 8월 11일까지 시연 가능한 AI 서비스로 좁히는 것입니다.

## 현재 작업 가설

> 우리는 20–24세 고려대 세종캠퍼스 무차량 대학생 중 4–8명의 취미·문화 모임을 처음 제안하거나 운영하는 학생이, 참여자 시간·취향·예산과 세종의 공간·교통 제약을 한 번에 맞추지 못해 모임 확정이 지연되거나 무산되는 문제를, 조건 수집과 대안 조합, 비교 가능한 일정안 제시, 합의 지원으로 해결한다.

서비스 후보명은 **회동(會同)**입니다. 위 문장은 검증 중인 가설이며 인터뷰와 실험 결과에 따라 바뀔 수 있습니다.

## 먼저 읽을 문서

1. [AGENTS.md](AGENTS.md) — 사람과 AI가 함께 작업할 때 지켜야 할 규칙
2. [문서 색인](docs/DOCUMENT_INDEX.md) — 문서 ID와 정본 경로
3. [현재 상태](docs/00_overview/CURRENT_STATUS.md) — 확정·가설·미정 항목
4. [문제 정의](docs/01_problem/PROBLEM_DEFINITION.md)
5. [주요 고객](docs/02_customer/PRIMARY_CUSTOMER.md)
6. [솔루션 개요](docs/03_solution/SOLUTION_BRIEF.md)
7. [검증 근거](docs/04_validation/EVIDENCE_LOG.md)
8. [해커톤 실행 계획](docs/06_delivery/HACKATHON_PLAN.md)

## 협업 원칙

- 고객과 문제를 먼저 확정하고 기능을 결정합니다.
- 사실, 근거, 가설, 결정, 미정을 명확히 구분합니다.
- 동일한 목적의 문서를 새로 만들지 않고 문서 색인의 정본을 갱신합니다.
- 주요 고객, 핵심 문제, MVP 범위 변경은 결정 기록을 남깁니다.
- 기능은 “8월 11일 데모에서 고객 문제 해결이 보이는가”를 기준으로 남기거나 버립니다.
- main 브랜치에 직접 작업하지 않고 작은 브랜치와 Pull Request로 협업합니다.

## 저장소 구조

| 경로 | 용도 |
|---|---|
| docs/00_overview | 현재 상태와 프로젝트 전제 |
| docs/01_problem | 문제 정의 |
| docs/02_customer | 주요 고객과 고객 여정 |
| docs/03_solution | 솔루션과 MVP 범위 |
| docs/04_validation | 인터뷰·자료·실험 근거 |
| docs/05_product | PRD와 수용 기준 |
| docs/06_delivery | 일정, 데모, 발표 준비 |
| docs/07_decisions | 변경 이유와 결정 기록 |
| docs/08_ai | AI 활용 절차와 재사용 프롬프트 |
| templates | 인터뷰·실험·결정 기록 양식 |
| .github | Issue와 Pull Request 양식 |

## 바로 시작하기

1. 기획자는 문제 정의와 주요 고객 문서의 “미검증 가설”을 확인합니다.
2. 인터뷰 또는 자료 조사 결과를 검증 근거 문서에 근거 ID로 추가합니다.
3. 가설을 바꿀 정도의 근거가 생기면 결정 기록을 작성하고 관련 정본을 함께 수정합니다.
4. 개발자는 PRD의 P0 요구사항만 구현하고 각 항목의 수용 기준으로 완료 여부를 확인합니다.
