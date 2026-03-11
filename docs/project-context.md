---
summary: "Canonical shared project context for ClawRouter — purpose, routing model, commands, and related repos"
read_when:
  - "starting a new session in Claude, Codex, Gemini, or a local LLM"
  - "looking up routing behavior, commands, docs, or related repos"
---

# Project Context

## Project

`ClawRouter` is the prompt-classification and smart-routing plugin for OpenClaw. It scores requests locally across weighted dimensions, maps them onto routing profiles and tiers, and hands the request off to the right model/runtime path without any external classification call.

## Core facts

- Published as `@blockrun/clawrouter`
- Local classification path targets sub-millisecond routing decisions
- OpenClaw extension/plugin package with source in `src/` and tests in `test/`
- Lionroot maintains a local-first fork surface documented in `LIONROOT-PATCHES.md`
- Sits beside `openclaw-cli-proxy`, `clawdbot`, `lionroot-openclaw`, and `~/.openclaw`

## Structure

```text
src/        ← router engine, provider dispatch, plugin integration, configs
test/       ← vitest coverage plus integration and resilience tests
docs/       ← architecture, configuration, pricing, troubleshooting, comparisons
skills/     ← OpenClaw-facing skill assets
scripts/    ← install and maintenance helpers
assets/     ← README/media assets
```

## Common commands

```bash
npm install
npm run build
npm test
npm run typecheck
npm run lint
docs-list --path ./docs
```

## Read next

- `docs/architecture.md` — routing engine internals and request flow
- `docs/configuration.md` — environment variables, wallet/proxy settings, programmatic usage
- `docs/features.md` — advanced routing features and automatic behaviors
- `docs/routing-profiles.md` — tier/profile pricing and model choices
- `docs/troubleshooting.md` — operational debugging and update steps
- `LIONROOT-PATCHES.md` — Lionroot-owned fork surfaces that must survive upstream syncs

## Related repos

- `~/clawd/openclaw-cli-proxy` — OpenAI-compatible proxy that dispatches local and CLI-backed model requests
- `~/clawdbot` — gateway + CLI surface that sends traffic through the OpenClaw stack
- `~/programming_projects/lionroot-openclaw` — hub strategy, command-post UI, and cross-repo documentation
- `~/.openclaw` — local runtime config, models, cron, and agent settings

## Tool entry points

- `AGENTS.md` — Codex / OpenAI tooling adapter
- `CLAUDE.md` — Claude Code adapter
- `GEMINI.md` — Gemini adapter
- For local or generic LLM workflows without a special root filename, start here.
