import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SiteLoader from "./SiteLoader";

const LoaderBoundary = ({ children }) => {
  const { pathname, search } = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setInitialLoading(false), 650);
    return () => window.clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    setRouteLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const routeTimer = window.setTimeout(() => setRouteLoading(false), 350);
    return () => window.clearTimeout(routeTimer);
  }, [pathname, search]);

  const isLoading = initialLoading || routeLoading;
  return <>{children}{isLoading && <SiteLoader label={initialLoading ? "Preparing your screen" : "Loading page"} />}</>;
};

export default LoaderBoundary;
