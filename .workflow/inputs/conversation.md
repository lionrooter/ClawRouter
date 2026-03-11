# Discovery Conversation

## Key Decisions
- Treat ClawRouter as the same shared-context rollout used in sibling repos, but keep it small and repo-native.
- Replace the existing monolithic root adapters with thin files that point into `docs/project-context.md`.
- Add front matter to the existing ClawRouter docs so `docs-list` becomes useful and tool entry can stay consistent.
- Record the new repo-owned doc surfaces in `LIONROOT-PATCHES.md` so future upstream syncs preserve them.
