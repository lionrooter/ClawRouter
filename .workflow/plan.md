# Technical Plan — Shared Multi-Tool Context Adapters for ClawRouter

**Status:** Approved
**Date:** 2026-03-11

## Architecture
Use the same layered contract as `lionroot-openclaw` and `openclaw-cli-proxy`: thin root adapters (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) point into neutral repo docs, durable knowledge lives in `docs/` with front matter, and task-specific state lives in `.workflow/`.

## Files to Modify
- `AGENTS.md` — convert to thin Codex/OpenAI adapter
- `CLAUDE.md` — convert symlink into thin Claude adapter
- `GEMINI.md` — new Gemini adapter
- `docs/project-context.md` — new neutral shared project context
- `docs/*.md` — add front matter only
- `LIONROOT-PATCHES.md` — preserve new repo-owned doc surfaces

## Tasks
1. [x] Archive the previous ClawRouter workflow docs and replace them with task-local approved docs.
2. [x] Add `docs/project-context.md` with commands, structure, related repos, and tool entry points.
3. [x] Replace root adapter docs with thin tool-specific files and add `GEMINI.md`.
4. [x] Add front matter to existing durable docs in `docs/`.
5. [x] Validate docs and diff hygiene, then commit.

## Testing Strategy
- `docs-list --path ./docs`
- `git diff --check`
- spot-check root adapters and `docs/project-context.md`

## Rollback Plan
Revert the single docs commit. No runtime state or migrations are involved.
