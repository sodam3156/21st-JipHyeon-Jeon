---
document_id: validation.source-snapshot-manifest
status: active
owner_role: planner
last_updated: 2026-07-24
---

# 조사 원본 스냅샷 식별자

원본 파일은 공개 저장소에 복제하지 않았습니다. 아래 크기와 SHA-256은 이번 실행에서 실제 읽은 파일을 다시 식별하기 위한 값입니다. 표의 파일명은 원천의 논리적 원본명이며, 첨부 과정에서 바뀐 로컬 별칭보다 `document_id`와 SHA-256을 우선합니다. 원본 접근이 없는 AI는 세부 주장을 새로 인용하거나 기존 인사이트를 다른 기회 영역으로 확장할 수 없습니다.

| 원천 ID | 원본 파일명 | bytes | SHA-256 | 접근 |
|---|---|---:|---|---|
| RS-STR-001 | `2026-07-23_해커톤_우승_전략_20개_001.md` | 17,228 | `81cf744bf83d8b5fa97ae1113c8e2573cd656f019ecf6cba1e7d1a1c39d87d66` | external attachment |
| RS-STR-002 | `2026-07-23_해커톤_우승_전략_20개_002.md` | 17,554 | `349f7241a0e50a8fbf08e787d11b2a2b6e146b47c8285e11c80346da5ca415f0` | external attachment |
| RS-STR-003 | `2026-07-23_해커톤_우승_전략_20개_003.md` | 22,078 | `d9ffe0588aefb5f8e8950fc0c34cc9087f7542e2d8a82fa8c325f0bcb01ee3db` | external attachment |
| RS-STR-004 | `2026-07-24_해커톤_우승_전략_20개_004.md` | 26,349 | `019292504e2a756bb630210c0ff1a4f3cf810f9140e1ee527d35583ad9d1fa96` | external attachment |
| RS-STR-005 | `2026-07-24_해커톤_우승_전략_20개_005.md` | 29,711 | `c0f135f120501011bc68e0a5b7f4642c6da32ab7b99f0da987d053bf21de0817` | external attachment |
| RS-STR-006 | `2026-07-24_해커톤_우승_전략_20개_006.md` | 28,468 | `ca1c7232e87613fd30560416c9d4a45225bcfe3cb042e92dbbceca93bc9fc7db` | external attachment |
| RS-PB-001 | `세종_구체적_문제_1000개_누적본.md` | 70,175 | `11c8ec3a03ce37b49059ed4c0ecfcb222264d63b255eb88aede20c27f34bf38d` | external canonical: sejong-ax.problem-bank |
| RS-BE-001 | `2026-07-23_run-001.md` | 28,137 | `0fe9676b4bdcee69b437693d2f424db4d324e21c4b501da38f3726dcc08a5ab6` | external attachment |
| RS-BE-002 | `2026-07-23_run-002.md` | 31,221 | `0bd84f9cf5891d851f5b063e7a3005a60add72e1c4c363cea05c4e537d6d1352` | external attachment |
| RS-BE-003 | `2026-07-23_run-003.md` | 31,852 | `411a1f5a294522a91211d9e2f786e30506e1c06770b16eaa7a944232aaa79914` | external attachment |
| RS-BE-004 | `2026-07-23_run-004.md` | 34,739 | `605d058448a1f8bfd72466834af1b5cd1492520f19d22f715170847b08bc62d3` | external attachment |
| RS-BE-005 | `2026-07-23_run-005.md` | 39,151 | `1ec461f4213f95a0d347edcb6672c955b1afd9ebf4ef113a4afc91f62576c39a` | external attachment |
| RS-BE-006 | `2026-07-23_run-006.md` | 40,449 | `e860fe9b50457a93515aa13d9bea95b036b6aad1b5754cccf9a9affd6dfb3cc0` | external attachment |
| RS-BE-007 | `2026-07-23_run-007.md` | 40,282 | `d41b0e158b201332ab747af65ea8eb5fa71d7f8795ca83c69d4e6d803c7371c8` | external attachment |
| RS-BE-008 | `2026-07-23_run-008.md` | 41,401 | `6e8e82353ae4058d08a0e06e77ea7442501b1686889046076c4b4cdc21b7a559` | external attachment |
| RS-BE-009 | `2026-07-23_run-009.md` | 40,930 | `04bdcc956b6773d678a26f9fca488afcb3f8c17e1e483b3a9fb231f095fdf29b` | external attachment |
| RS-BE-010 | `2026-07-23_run-010.md` | 38,352 | `34196e64734d262d53a43c840129a7a1c08c6d850e9d2d346af6e7f719c9e52b` | external attachment |

## 재검증 절차

1. 원본 파일을 제공받습니다.
2. 파일 크기와 SHA-256을 이 표와 비교합니다.
3. 다른 값이면 새 원천 ID로 등록하고 변경점을 조사합니다.
4. 같은 값이면 실제 읽은 구간과 claim을 AR 실행 기록에 남깁니다.
