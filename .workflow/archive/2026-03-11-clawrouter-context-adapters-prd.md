# PRD — Normalize Lionroot ClawRouter Fork

**Status:** Approved
**Date:** 2026-03-10

## Summary
Move the real Lionroot ClawRouter fork state back onto fork `main`, preserve the current Lionroot-specific local changes, and merge the latest upstream ClawRouter updates without losing Lionroot behavior.

## Current Lionroot-owned changes to preserve
- Local CLI proxy dispatch for routed `local/*`, `ollama/*`, `claude-cli/*`, `codex/*`, and related local-backed model families.
- Local memory-agent command/tool integration in the OpenClaw plugin entrypoint.
- Existing Lionroot routing config and fallback-chain behavior already present on the sync branch.

## Acceptance Criteria
- [x] Workflow docs are approved for this sync task.
- [ ] In-flight local changes in `src/proxy.ts`, `src/index.ts`, and `src/proxy.local-dispatch.test.ts` are committed.
- [ ] Lionroot patch inventory is documented for future syncs.
- [ ] Fork `main` becomes the canonical deployable branch for Lionroot ClawRouter.
- [ ] Latest `upstream/main` is merged into fork `main`.
- [ ] Lionroot local-proxy dispatch and memory-agent behavior remain intact after the merge.
- [ ] Targeted tests pass, followed by repo verification.

## Out of Scope
- Rewriting ClawRouter’s scoring strategy.
- Reworking unrelated payment-chain internals beyond what upstream merge requires.
- Refactoring the CLI proxy contract itself.
