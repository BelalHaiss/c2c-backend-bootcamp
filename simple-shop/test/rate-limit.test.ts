type FetchOptions = Parameters<typeof fetch>[1];

export interface RateLimitAttempt {
  attempt: number;
  status: number;
  ok: boolean;
  remaining: number | null;
}

export async function probeRateLimit(
  route: string,
  requestCount: number,
  options?: FetchOptions,
  baseUrl = process.env.RATE_LIMIT_TEST_URL ?? 'http://localhost:3000',
  globalPrefix = 'api',
): Promise<RateLimitAttempt[]> {
  if (requestCount < 1) {
    throw new Error('requestCount must be at least 1');
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const sanitizedPrefix = globalPrefix.replace(/^\/+|\/+$/g, '');
  const sanitizedRoute = route.replace(/^\/+/, '');
  const url = `${normalizedBase}/${sanitizedPrefix}/${sanitizedRoute}`;
  const attempts: Array<Promise<RateLimitAttempt>> = [];

  for (let i = 0; i < requestCount; i++) {
    attempts.push(
      fetch(url, options).then((response) => {
        const remainingHeader = response.headers.get('x-ratelimit-remaining');
        const remaining =
          remainingHeader !== null && !Number.isNaN(Number(remainingHeader))
            ? Number(remainingHeader)
            : null;

        return {
          attempt: i + 1,
          ok: response.ok,
          status: response.status,
          remaining,
        };
      }),
    );
  }

  const settled = await Promise.allSettled(attempts);

  return settled.map((result, index) =>
    result.status === 'fulfilled'
      ? result.value
      : {
          attempt: index + 1,
          ok: false,
          status: 0,
          remaining: null,
        },
  );
}

probeRateLimit('/rate-limit-test/safe', 1000)
  .then(console.log)
  .catch(console.log);
// probeRateLimit('/rate-limit-test/unsafe', 1000)
//   .then(console.log)
//   .catch(console.log);
