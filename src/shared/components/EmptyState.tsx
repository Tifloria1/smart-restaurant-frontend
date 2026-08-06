import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="shared-empty-state">
      {icon && (
        <div className="shared-empty-state__icon">
          {icon}
        </div>
      )}

      <h3>{title}</h3>

      {description && (
        <p>{description}</p>
      )}

      {action && (
        <div className="shared-empty-state__action">
          {action}
        </div>
      )}
    </div>
  );
}