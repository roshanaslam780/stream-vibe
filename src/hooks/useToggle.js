import { useState, useCallback } from "react";

function useToggle(initial = false) {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setState((prev) => {
      if (!prev) return true; // Only update if it was false
      return prev;
    });
  }, []);

  const setFalse = useCallback(() => {
    setState((prev) => {
      if (prev) return false; // Only update if it was true (prevents redundant renders!)
      return prev;
    });
  }, []);

  return { state, toggle, setTrue, setFalse };
}

export default useToggle;