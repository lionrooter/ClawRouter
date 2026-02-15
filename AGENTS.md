# AGENTS.md — ClawRouter

## Project
15-dimension weighted scoring classifies prompts in <1ms. Routes to cheapest model that can handle each request. MIT licensed, zero external calls.

## Structure
```
src/              ← Routing engine, scoring dimensions, model configs
docs/             ← Architecture, configuration, features, troubleshooting
skills/           ← OpenClaw skill integration
test/             ← Test suites
scripts/          ← Install and utility scripts
```

## Build & Test
```bash
npm install
npm run build     # tsup
npm test          # vitest
npm run lint      # eslint
```

## Docs
Check `docs/` before making changes. Key files:
- `docs/architecture.md` — routing engine internals
- `docs/configuration.md` — model configs, tier definitions
- `docs/features.md` — scoring dimensions, agentic mode
- `docs/troubleshooting.md` — common issues

## Related Projects
- **CLI Proxy**: ~/clawd/openclaw-cli-proxy (receives classified model IDs)
- **Gateway**: ~/clawdbot (uses ClawRouter via proxy)
- **Lionroot Hub**: ~/programming_projects/lionroot-openclaw (STRATEGY.md)
