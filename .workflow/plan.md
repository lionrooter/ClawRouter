# Technical Plan — Normalize Lionroot ClawRouter Fork

**Status:** Approved
**Date:** 2026-03-10

## Steps
1. Inspect the current ClawRouter fork state and inventory Lionroot-owned deltas.
2. Commit the in-flight Lionroot changes in `src/proxy.ts`, `src/index.ts`, and tests.
3. Create `LIONROOT-PATCHES.md` documenting owned files and upstream patch points.
4. Move local `main` forward to the real Lionroot branch.
5. Merge latest `upstream/main` into `main`, resolving conflicts by preserving the documented Lionroot deltas.
6. Run targeted tests for proxy dispatch and affected plugin/runtime surfaces.
7. Run repo verification, push `main`, and delete the obsolete sync branch.

## Verification
- focused vitest for `src/proxy.local-dispatch.test.ts`
- relevant tests for proxy/fallback behavior if touched by merge conflicts
- `npm run build`
- `npm test`
- `git status` clean at end
