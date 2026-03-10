import { describe, expect, it } from "vitest";

import { detectDegradedSuccessResponse } from "./proxy.js";

describe("detectDegradedSuccessResponse", () => {
  it("flags plain overload placeholder text", () => {
    const result = detectDegradedSuccessResponse(
      "The AI service is temporarily overloaded. Please try again in a moment.",
    );
    expect(result).toBeDefined();
  });

  it("flags overload placeholder inside successful chat response JSON", () => {
    const payload = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: "The AI service is temporarily overloaded. Please try again in a moment.",
          },
        },
      ],
    });

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags known repetitive hallucination loop patterns", () => {
    const payload = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: `The boxed is the response.

Yes.

The response is the text.

Yes.

The final answer is the boxed.

Yes.`,
          },
        },
      ],
    });

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags overloaded output in SSE stream-like JSONL payload", () => {
    const payload = [
      'data: {"choices":[{"delta":{"content":"The AI service is temporarily overloaded. Please try again in a moment."}]}',
      "",
      "data: [DONE]",
      "",
    ].join("\n");

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags SSE payload with you've-hit-your-limit phrasing", () => {
    const payload = [
      'data: {"choices":[{"delta":{"content":"You\'ve hit your limit · resets Feb 26 at 10am (America/New_York)"}]}',
      "",
      "data: [DONE]",
      "",
    ].join("\n");

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags OAuth token refresh failures in plain text", () => {
    const payload =
      "OAuth token refresh failed for anthropic: Failed to refresh OAuth token for anthropic. Please try again or re-authenticate.";

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags payment verification failed in plain text", () => {
    const payload = "Payment verification failed: Invalid signature";

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags contraction-style rate-limit phrasing", () => {
    const payload = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: "You've hit your limit · resets Feb 26 at 10am (America/New_York)",
          },
        },
      ],
    });

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags payment verification failed in successful chat response JSON", () => {
    const payload = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: "Payment verification failed",
          },
        },
      ],
    });

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("flags payment verification failed in SSE stream chunks", () => {
    const payload = [
      'data: {"choices":[{"delta":{"content":"Payment verification failed"}]}',
      "",
      "data: [DONE]",
      "",
    ].join("\n");

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeDefined();
  });

  it("does not flag normal assistant responses", () => {
    const payload = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: "Paris is the capital of France.",
          },
        },
      ],
    });

    const result = detectDegradedSuccessResponse(payload);
    expect(result).toBeUndefined();
  });
});
