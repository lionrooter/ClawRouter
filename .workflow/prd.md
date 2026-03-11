# PRD — Shared Multi-Tool Context Adapters for ClawRouter

**Status:** Approved
**Date:** 2026-03-11
**Provenance:** See `.workflow/inputs/`

## Summary
Give ClawRouter the same shared AI-context structure already added in sibling Lionroot repos so Claude, Codex, Gemini, and local LLM workflows all start from the same neutral project docs instead of duplicated root-file prompts.

## User Stories
- As an engineer using Codex, I want `AGENTS.md` to stay thin and point into durable docs so repo context does not drift.
- As an engineer using Claude or Gemini, I want matching root adapters and a neutral `docs/project-context.md` entry point so the same repo knowledge works across tools.
- As an operator syncing this fork with upstream, I want the new docs/adapters recorded in `LIONROOT-PATCHES.md` so they survive future merges.

## Acceptance Criteria
- [x] Add `docs/project-context.md` with front matter and shared ClawRouter context.
- [x] Replace monolithic root adapters with thin `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` files.
- [x] Convert `CLAUDE.md` from a symlink into a normal adapter file.
- [x] Add `summary` and `read_when` front matter to the existing durable docs in `docs/`.
- [x] Update `LIONROOT-PATCHES.md` so the new adapter/doc surfaces are preserved across upstream syncs.
- [x] Validate with `docs-list --path ./docs` and `git diff --check`.

## Out of Scope
- Any routing, inference, payment, or runtime behavior changes.
- Rewriting ClawRouter architecture docs beyond adding front matter.
- Packaging or publish changes.
