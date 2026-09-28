import test from "node:test";
import assert from "node:assert/strict";
import { isTransientAiError, withAiRetry } from "../server/retry.js";

test("AI retry recovers from temporary 503 errors", async () => {
  let attempts = 0;
  const delays = [];
  const result = await withAiRetry(async () => {
    attempts += 1;
    if (attempts < 3) throw Object.assign(new Error("busy"), { status: 503 });
    return "ready";
  }, {
    baseDelay: 10,
    sleep: async (delay) => delays.push(delay)
  });

  assert.equal(result, "ready");
  assert.equal(attempts, 3);
  assert.equal(delays.length, 2);
  assert.ok(delays[1] > delays[0]);
});

test("AI retry does not repeat permanent client errors", async () => {
  let attempts = 0;
  await assert.rejects(() => withAiRetry(async () => {
    attempts += 1;
    throw Object.assign(new Error("bad request"), { status: 400 });
  }, { sleep: async () => {} }), /bad request/);
  assert.equal(attempts, 1);
});

test("AI retry classifies rate limits and server errors as transient", () => {
  assert.equal(isTransientAiError({ status: 429 }), true);
  assert.equal(isTransientAiError({ status: 503 }), true);
  assert.equal(isTransientAiError({ status: 403 }), false);
});
