
import { useState, useEffect, useCallback } from "react";

const useApi = (fetcherFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  // Create a stable representation of the arguments.
  const dependenciesKey = JSON.stringify(dependencies);

  const refetch = useCallback(() => {
    setRequestCount((count) => count + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const args = JSON.parse(dependenciesKey);

        const result = await fetcherFn(
          ...args,
          controller.signal
        );

        if (isActive) {
          setData(result);
        }
      } catch (err) {
        if (isActive && err.name !== "AbortError") {
          setError(
            err.message || "An unexpected error occurred"
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [fetcherFn, dependenciesKey, requestCount]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export { useApi };
