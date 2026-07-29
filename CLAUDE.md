---
document_id: repo.claude-entrypoint
status: active
owner_role: product-owner
last_updated: 2026-07-29
---

# Claude Code 진입점

**이 저장소의 운영 지침 정본은 [`AGENTS.md`](AGENTS.md)다. 먼저 그것을 읽는다.**

여기에 규칙을 중복해서 적지 않는다. 지침이 두 곳에 있으면 반드시 서로 어긋나고, 어느 쪽이 맞는지 아무도 모르게 된다.

## 왜 AGENTS.md 인가

이 저장소는 Claude Code 외에 다른 에이전트도 함께 쓴다. Codex 계열 에이전트는 `.hermes.md` → `AGENTS.md` → `CLAUDE.md` 순으로 **첫 번째로 발견한 파일 하나만** 컨텍스트에 넣는다. 여러 도구가 같은 규칙을 공유하려면 정본이 `AGENTS.md`여야 한다.

## ruflo 를 쓸 때

멀티에이전트 오케스트레이션(ruflo) 운영 규칙은 `AGENTS.md` **13절**에 있다. 에이전트 상한, 스웜을 쓸 경우와 쓰지 않을 경우, 메모리 금지 항목, 검증 방법이 거기 있다.

`npx ruflo@latest init` 을 다시 실행해도 이 파일은 덮어쓰이지 않는다(기존 `CLAUDE.md` 가 있으면 건너뛴다). 만약 이 파일이 180줄짜리 영문 ruflo 설정으로 바뀌어 있다면, 그건 누군가 이 파일을 지운 뒤 init 을 돌린 것이다. 그 내용을 여기 두지 말고 13절과 대조해 필요한 것만 반영한 뒤 이 포인터로 되돌린다.
