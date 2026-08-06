interface PageLoaderProps {
  message?: string;
}

export function PageLoader({
  message = "Loading...",
}: PageLoaderProps) {
  return (
    <div
      className="shared-page-loader"
      role="status"
      aria-live="polite"
    >
      <span className="shared-page-loader__spinner" />

      <span>{message}</span>
    </div>
  );
}