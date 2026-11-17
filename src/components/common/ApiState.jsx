import { Icon } from "@iconify/react";

const ApiState = ({
  loading = false,
  error = null,
  data = null,
  isEmpty,
  onRetry,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}) => {
  // Loading state
  if (loading && !data) {
    return (
      loadingComponent ?? (
        <div className="w-full min-h-50 flex-center">
          <div className="size-10 border-2 border-brand-45 border-t-transparent rounded-full animate-spin" />
        </div>
      )
    );
  }

  // Error state
  if (error && !data) {
    return (
      errorComponent ?? (
        <div className="w-full min-h-50 flex-center flex-col gap-3 text-center">
          <Icon icon="lucide:alert-circle" className="size-8 text-brand-45" />

          <p className="text-sm text-brand-45">{error}</p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm underline hover:text-brand-45 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )
    );
  }

  // Empty state
  const empty =
    isEmpty !== undefined
      ? isEmpty
      : Array.isArray(data)
        ? data.length === 0
        : !data;

  if (!loading && empty) {
    return (
      emptyComponent ?? (
        <div className="w-full min-h-50 flex-center flex-col gap-2 text-center">
          <Icon icon="lucide:inbox" className="size-8 text-gray-500" />

          <p className="text-sm text-gray-400">No content available.</p>
        </div>
      )
    );
  }

  // Success state
  return children;
};

export default ApiState;
