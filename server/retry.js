const TRANSIENT_STATUS_CODES = new Set([408, 429]);

export function aiErrorStatus(error) {
  const status = Number(error?.status ?? error?.code ?? error?.error?.code);
  return Number.isInteger(status) ? status : null;
}

export function isTransientAiError(error) {
  const status = aiErrorStatus(error);
  return TRANSIENT_STATUS_CODES.has(status) || (status >= 500 && status <= 599);
}

export async function withAiRetry(operation, options = {}) {
  const maxAttempts = options.maxAttempts ?? 4;
  const baseDelay = options.baseDelay ?? 750;
  const sleep = options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (!isTransientAiError(error) || attempt === maxAttempts) throw error;
      const exponentialDelay = baseDelay * (2 ** (attempt - 1));
      const jitter = Math.floor(Math.random() * Math.max(1, baseDelay / 3));
      await sleep(exponentialDelay + jitter);
    }
  }

  throw new Error("AI retry loop exited unexpectedly.");
}
