# LIONROOT-PATCHES.md

Maintained Lionroot delta for the ClawRouter fork.

## 1. Lionroot-owned files and surfaces

### `src/router/config.lionheart.ts`
Lionroot local-first routing profile. This is the main strategic fork surface and should be preserved across upstream syncs.

Preserve:
- local EXO / Ollama preference for simple and medium tiers
- Claude CLI and Codex CLI subscription fallbacks before pay-per-token cloud fallbacks
- Lionroot-specific tier mappings and fallback order

### `src/proxy.ts`
Lionroot proxy/runtime behavior layered on top of upstream.

Preserve:
- degraded-provider fallback hardening from `1301876`
- local CLI proxy dispatch helpers for routed local-backed model ids:
  - `usesLocalCliProxy(...)`
  - `resolveModelDispatchUrl(...)`
- dispatch of `local/*`, `exo/*`, `tool-local/*`, `ollama/*`, `codex/*`, and `claude-cli/*` via local proxy `http://127.0.0.1:11435/v1/chat/completions`

### `src/index.ts`
Lionroot OpenClaw plugin integration additions.

Preserve:
- memory-agent tool registrations:
  - `memory_agent_query`
  - `memory_agent_ingest`
  - `memory_agent_status`
  - `memory_agent_list`
  - `memory_agent_consolidate`
- `/memory-agent` operational command
- memory-agent base URL resolution via:
  - `OPENCLAW_MEMORY_AGENT_BASE_URL`
  - legacy `OPENCLAW_MEMORY_AGENT_PORT`
  - default `http://127.0.0.1:8888`

## 2. Lionroot test/doc surfaces

- `src/proxy.local-dispatch.test.ts` — focused coverage for local proxy dispatch helpers
- `src/proxy.degraded-response.test.ts` — degraded-provider fallback behavior
- `test/fallback.ts` — fallback-chain expectations
- `test/integration/setup.ts` — preserve upstream worker-scoped integration harness semantics; do not revert to ephemeral port 0
- `AGENTS.md` — thin Codex/OpenAI adapter into shared docs
- `CLAUDE.md` — thin Claude adapter into shared docs
- `GEMINI.md` — thin Gemini adapter into shared docs
- `docs/project-context.md` — neutral shared entry point for Claude, Codex, Gemini, and local LLM workflows

## 3. Current committed Lionroot-only commits vs upstream

- `54a3136` — Add Lionheart custom routing config for local-first inference
- `f09477f` — Add Codex CLI to fallback chains before DeepSeek
- `00a3617` — docs: add AGENTS and CLAUDE parity files
- `8767c79` — test(clawrouter): isolate integration proxy port
- `1301876` — fix(clawrouter): harden fallback routing for degraded providers

## 4. Upstream sync notes (2026-03-10)

- Upstream sync landed on fork `main` by additive merge, not by replacing Lionroot surfaces wholesale.
- `src/proxy.ts` must keep Lionroot local CLI dispatch (`LOCAL_CLI_PROXY_API`, `usesLocalCliProxy(...)`, `resolveModelDispatchUrl(...)`) while also keeping upstream image-generation, update-hint, and body-read-timeout logic.
- `test/integration/setup.ts` should follow upstream worker-scoped test-port allocation.

## 5. Mainline policy

- Fork mainline is `main`.
- Move Lionroot changes onto `main`; do not leave them stranded on `lionroot/upstream-sync-*` branches.
- Future upstream syncs should merge `upstream/main` into fork `main` and preserve only the surfaces documented here.
