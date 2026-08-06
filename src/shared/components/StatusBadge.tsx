import type { ReactNode } from "react";

type StatusBadgeVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusBadgeVariant;
}

export function StatusBadge({
  children,
  variant = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={`shared-status-badge shared-status-badge--${variant}`}
    >
      {children}
    </span>
  );
}