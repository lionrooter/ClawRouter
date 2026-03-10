/**
 * Lionheart Custom Routing Config — AlexFinn Three-Tier Strategy
 *
 * Strategy (per @AlexFinn recommendation):
 *   1. Opus as orchestrator — planning, reasoning, complex analysis
 *   2. Codex GPT for coding — code generation, multi-step technical tasks
 *   3. Qwen 3.5 small models for dirty work — heartbeat, organizing, summarizing (~70%)
 *
 * Backends (via CLI proxy at 127.0.0.1:11435):
 *   - Ollama (local, Apple Silicon) → Qwen3.5 4B/0.8B/9B ($0, native tool calling)
 *   - Ollama (local)               → Qwen3 14B ($0, legacy workhorse)
 *   - Claude CLI (subscription)    → Opus 4.6 orchestrator via `claude --print`
 *   - Codex CLI (subscription)     → GPT-5.3 Codex / o3 via `codex --full-auto`
 *   - DeepSeek API                 → deepseek-chat / deepseek-reasoner (pay-per-token)
 *
 * Fallback priority: local($0) → subscription($0 marginal) → cloud(per-token)
 *
 * Model ID convention (matches CLI proxy routing):
 *   local/ollama-qwen3.5-4b   → Qwen3.5 4B (3.4GB, fast, tool calling) — SIMPLE primary
 *   local/ollama-qwen3.5-0.8b → Qwen3.5 0.8B (1.0GB, ultra-fast) — heartbeat/yes-no
 *   local/ollama-qwen3.5-9b   → Qwen3.5 9B (6.6GB, stronger) — agentic medium
 *   local/ollama-qwen3-14b    → Qwen3 14B (legacy, tool calling)
 *   claude-cli/opus            → Claude Opus 4.6 (subscription) — orchestrator
 *   claude-cli/sonnet          → Claude Sonnet 4.5 (subscription) — fallback
 *   codex/gpt-5.3              → GPT-5.3 Codex (subscription, code specialist)
 *   codex/o3                   → OpenAI o3 (subscription, reasoning specialist)
 *   deepseek/deepseek-chat     → DeepSeek V3 ($0.14/$0.28 per M tokens)
 *   deepseek/deepseek-reasoner → DeepSeek R1 ($0.55/$2.19 per M tokens)
 */

import type { RoutingConfig } from "./types.js";
import { DEFAULT_ROUTING_CONFIG } from "./config.js";

export const LIONHEART_ROUTING_CONFIG: RoutingConfig = {
  ...DEFAULT_ROUTING_CONFIG,

  tiers: {
    // SIMPLE: greetings, definitions, translations, yes/no, heartbeat, summaries
    // → Qwen 3.5 4B: fast, tool calling, $0 (3.4GB sweet spot)
    SIMPLE: {
      primary: "local/ollama-qwen3.5-4b",
      fallback: [
        "local/ollama-qwen3.5-0.8b",  // $0 ultra-fast fallback
        "deepseek/deepseek-chat",      // $0.14/M (last resort)
      ],
    },

    // MEDIUM: code tasks, technical questions, multi-step instructions
    // → Codex GPT for coding
    MEDIUM: {
      primary: "codex/gpt-5.3",
      fallback: [
        "claude-cli/sonnet",           // subscription fallback
        "local/ollama-qwen3-14b",      // $0 local
        "deepseek/deepseek-chat",      // $0.14/M
      ],
    },

    // COMPLEX: architecture design, complex analysis, planning, orchestration
    // → Opus as orchestrator
    COMPLEX: {
      primary: "claude-cli/opus",
      fallback: [
        "codex/gpt-5.3",              // subscription — code fallback
        "claude-cli/sonnet",           // subscription downgrade
        "deepseek/deepseek-chat",      // $0.14/M
      ],
    },

    // REASONING: proofs, formal derivation, chain-of-thought, math
    REASONING: {
      primary: "claude-cli/opus",
      fallback: [
        "codex/o3",                    // subscription — OpenAI reasoning model
        "deepseek/deepseek-reasoner",  // $0.55/M
      ],
    },
  },

  // Agentic tiers: models with strong tool calling for multi-step tasks
  // Key: Qwen3.5 has native OpenAI-compatible tool calling
  agenticTiers: {
    SIMPLE: {
      primary: "local/ollama-qwen3.5-4b",  // Native tool calling, $0
      fallback: [
        "local/ollama-qwen3.5-9b",    // $0 stronger fallback
        "deepseek/deepseek-chat",      // $0.14/M
      ],
    },
    MEDIUM: {
      primary: "local/ollama-qwen3.5-9b",  // 9B for agentic medium, tool calling
      fallback: [
        "codex/gpt-5.3",              // subscription, code specialist
        "claude-cli/sonnet",           // subscription
        "deepseek/deepseek-chat",      // $0.14/M
      ],
    },
    COMPLEX: {
      primary: "claude-cli/opus",
      fallback: [
        "codex/gpt-5.3",              // subscription — code fallback
        "claude-cli/sonnet",           // subscription downgrade
        "deepseek/deepseek-chat",      // $0.14/M
      ],
    },
    REASONING: {
      primary: "claude-cli/opus",
      fallback: [
        "codex/o3",                    // subscription — reasoning specialist
        "deepseek/deepseek-reasoner",  // $0.55/M
      ],
    },
  },

  scoring: {
    ...DEFAULT_ROUTING_CONFIG.scoring,
    tierBoundaries: {
      simpleMedium: 0.0,       // Default — negative scores → SIMPLE, near-zero → ambiguous
      mediumComplex: 0.30,     // Unchanged
      complexReasoning: 0.50,  // Unchanged
    },
  },

  overrides: {
    ...DEFAULT_ROUTING_CONFIG.overrides,
    // Lower threshold since local models have small context windows
    maxTokensForceComplex: 8_000,
    // Default ambiguous to SIMPLE (routes to Qwen, free)
    ambiguousDefaultTier: "SIMPLE",
  },
};

/**
 * Model pricing for cost estimation and savings calculation.
 * Local models are $0. Claude CLI is subscription (treat as $0 marginal cost).
 * Only DeepSeek has real per-token costs.
 */
export const LIONHEART_MODEL_PRICING = new Map([
  // Local models — $0
  ["local/ollama-qwen3.5-4b", { inputPrice: 0, outputPrice: 0 }],
  ["local/ollama-qwen3.5-0.8b", { inputPrice: 0, outputPrice: 0 }],
  ["local/ollama-qwen3.5-9b", { inputPrice: 0, outputPrice: 0 }],
  ["local/ollama-qwen3-14b", { inputPrice: 0, outputPrice: 0 }],
  ["local/exo-llama-8b", { inputPrice: 0, outputPrice: 0 }],
  ["local/exo-llama-3b", { inputPrice: 0, outputPrice: 0 }],

  // Claude CLI — subscription, no marginal cost per token
  ["claude-cli/sonnet", { inputPrice: 0, outputPrice: 0 }],
  ["claude-cli/opus", { inputPrice: 0, outputPrice: 0 }],

  // Codex CLI — subscription, no marginal cost per token
  ["codex/gpt-5.3", { inputPrice: 0, outputPrice: 0 }],
  ["codex/o3", { inputPrice: 0, outputPrice: 0 }],

  // DeepSeek — pay-per-token (prices in $ per 1M tokens)
  ["deepseek/deepseek-chat", { inputPrice: 0.14, outputPrice: 0.28 }],
  ["deepseek/deepseek-reasoner", { inputPrice: 0.55, outputPrice: 2.19 }],

  // Baseline for savings comparison (Opus API pricing)
  ["anthropic/claude-opus-4", { inputPrice: 15.0, outputPrice: 75.0 }],
]);
