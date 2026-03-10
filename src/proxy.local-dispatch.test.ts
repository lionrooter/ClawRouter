import { describe, expect, it } from "vitest";

import { resolveModelDispatchUrl, usesLocalCliProxy } from "./proxy.js";

describe("usesLocalCliProxy", () => {
  it("detects local and subscription-backed model families", () => {
    expect(usesLocalCliProxy("local/ollama-qwen3.5-4b")).toBe(true);
    expect(usesLocalCliProxy("local/exo-llama-8b")).toBe(true);
    expect(usesLocalCliProxy("tool-local")).toBe(true);
    expect(usesLocalCliProxy("ollama/qwen3-14b")).toBe(true);
    expect(usesLocalCliProxy("claude-cli/opus")).toBe(true);
    expect(usesLocalCliProxy("codex/gpt-5.3")).toBe(true);
  });

  it("leaves ordinary BlockRun upstream models alone", () => {
    expect(usesLocalCliProxy("blockrun/auto")).toBe(false);
    expect(usesLocalCliProxy("moonshot/kimi-k2.5")).toBe(false);
    expect(usesLocalCliProxy("nvidia/gpt-oss-120b")).toBe(false);
  });
});

describe("resolveModelDispatchUrl", () => {
  const upstream = "https://blockrun.ai/api/v1/chat/completions";

  it("routes local-backed models to the local CLI proxy", () => {
    expect(resolveModelDispatchUrl(upstream, "local/ollama-qwen3.5-4b")).toBe(
      "http://127.0.0.1:11435/v1/chat/completions",
    );
    expect(resolveModelDispatchUrl(upstream, "claude-cli/opus")).toBe(
      "http://127.0.0.1:11435/v1/chat/completions",
    );
    expect(resolveModelDispatchUrl(upstream, "codex/gpt-5.3")).toBe(
      "http://127.0.0.1:11435/v1/chat/completions",
    );
  });

  it("keeps ordinary BlockRun models on the upstream URL", () => {
    expect(resolveModelDispatchUrl(upstream, "moonshot/kimi-k2.5")).toBe(upstream);
    expect(resolveModelDispatchUrl(upstream, "blockrun/auto")).toBe(upstream);
  });
});
