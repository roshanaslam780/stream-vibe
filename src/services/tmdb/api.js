const BASE_API_URL = "https://api.themoviedb.org/3";
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 4;
const MIN_REQUEST_INTERVAL_MS = 120;
const responseCache = new Map();
const pendingRequests = new Map();
let activeRequests = 0;
let lastRequestStartedAt = 0;
const requestQueue = [];
let queueTimer = null;


const waitForRequestSlot = (signal) =>
  new Promise((resolve, reject) => {
    const entry = { resolve, reject, signal };
    const abort = () => {
      const index = requestQueue.indexOf(entry);
      if (index !== -1) requestQueue.splice(index, 1);
      reject(new DOMException("The request was aborted", "AbortError"));
    };

    if (signal?.aborted) return abort();
    entry.abort = abort;
    signal?.addEventListener("abort", abort, { once: true });
    requestQueue.push(entry);
    processQueue();
  });

const processQueue = () => {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS || requestQueue.length === 0) return;

  const delay = Math.max(0, MIN_REQUEST_INTERVAL_MS - (Date.now() - lastRequestStartedAt));
  if (delay > 0) {
    if (queueTimer === null) {
      queueTimer = setTimeout(() => {
        queueTimer = null;
        processQueue();
      }, delay);
    }
    return;
  }

  const entry = requestQueue.shift();
  entry.signal?.removeEventListener("abort", entry.abort);
  if (entry.signal?.aborted) {
    entry.reject(new DOMException("The request was aborted", "AbortError"));
    processQueue();
    return;
  }

  activeRequests += 1;
  lastRequestStartedAt = Date.now();
  entry.resolve(() => {
    activeRequests -= 1;
    processQueue();
  });
  processQueue();
};

const waitForResponse = (promise, signal) => {
  if (!signal) return promise;
  if (signal.aborted) {
    return Promise.reject(new DOMException("The request was aborted", "AbortError"));
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => signal.removeEventListener("abort", onAbort);
    const onAbort = () => {
      cleanup();
      reject(new DOMException("The request was aborted", "AbortError"));
    };

    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => { cleanup(); resolve(value); },
      (error) => { cleanup(); reject(error); },
    );
  });
};

const TMDBFetch = async (endPoint, params = {}, signal) => {
  if (!READ_ACCESS_TOKEN) {
    throw new Error("TMDB is not configured. Set VITE_TMDB_READ_ACCESS_TOKEN in your environment.");
  }

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  const fetchQuery = `${BASE_API_URL}${endPoint}${queryString ? `?${queryString}` : ""
    }`;

  const cached = responseCache.get(fetchQuery);
  if (cached && cached.expiresAt > Date.now()) return waitForResponse(Promise.resolve(cached.data), signal);

  let request = pendingRequests.get(fetchQuery);
  if (!request) {
    request = (async () => {
      const releaseSlot = await waitForRequestSlot();
      try {
        const response = await fetch(fetchQuery, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
          },
        });

        if (!response.ok) {
          let errorMessage = response.statusText;
          try {
            const errorData = await response.json();
            errorMessage = errorData.status_message || errorMessage;
          } catch {
            // Response did not contain valid JSON.
          }
          throw new Error(`${response.status}: ${errorMessage || "Request failed"}`);
        }

        const data = await response.json();
        if (responseCache.size >= 200) {
          responseCache.delete(responseCache.keys().next().value);
        }
        responseCache.set(fetchQuery, { data, expiresAt: Date.now() + CACHE_TTL_MS });
        return data;
      } finally {
        releaseSlot();
      }
    })();
    pendingRequests.set(fetchQuery, request);
    const clearRequest = () => {
      if (pendingRequests.get(fetchQuery) === request) pendingRequests.delete(fetchQuery);
    };
    request.then(clearRequest, clearRequest);
  }

  return waitForResponse(request, signal);
};

export { TMDBFetch };
