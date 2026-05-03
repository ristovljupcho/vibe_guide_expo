import { Platform } from 'react-native';

// On web the app runs in the browser on the same machine as the dev server,
// so localhost:8080 reaches the Spring Boot backend directly.
// On Android emulator, 10.0.2.2 maps to the host machine's localhost.
// On a physical device / iOS simulator, set EXPO_PUBLIC_API_BASE_URL explicitly.
const API_BASE_URL = (() => {
  if (Platform.OS === 'web') {
    return process.env.EXPO_PUBLIC_API_BASE_URL_WEB?.replace(/\/+$/, '') ?? 'http://localhost:8080';
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ?? '';
})();
const DEFAULT_USER_ID = process.env.EXPO_PUBLIC_DEFAULT_USER_ID ?? '';
const DEFAULT_TIMEOUT_MS = 15000;

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getDefaultUserId() {
  return DEFAULT_USER_ID;
}

// Encodes a single path segment so ids containing reserved chars don't break URL parsing.
export function encodePathSegment(value: string | number) {
  return encodeURIComponent(String(value));
}

export interface FetchJsonOptions {
  suppressErrors?: boolean;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function fetchJson<T>(
  path: string,
  query?: Record<string, string | number | boolean | string[] | undefined>,
  options?: FetchJsonOptions,
): Promise<T | null> {
  if (!API_BASE_URL) {
    return null;
  }

  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        url.searchParams.append(key, item);
      });
      return;
    }

    url.searchParams.set(key, String(value));
  });

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(new Error('Request timed out')),
    options?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  const signal = options?.signal
    ? composeSignals(options.signal, timeoutController.signal)
    : timeoutController.signal;

  try {
    const response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      signal,
    });

    if (!response.ok) {
      if (options?.suppressErrors) {
        return null;
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // Caller-initiated cancellation should always propagate so React effects can bail out.
    if (options?.signal?.aborted) {
      throw error;
    }
    if (!options?.suppressErrors) {
      console.warn(`[api] Request failed for ${path}`, error);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function composeSignals(...signals: AbortSignal[]): AbortSignal {
  if (signals.length === 1) {
    return signals[0];
  }

  const controller = new AbortController();

  const onAbort = (event: Event) => {
    const target = event.target as AbortSignal;
    controller.abort(target.reason);
  };

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  return controller.signal;
}
