import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="shared-page-header">
      <div className="shared-page-header__content">
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {actions && (
        <div className="shared-page-header__actions">
          {actions}
        </div>
      )}
    </div>
  );
}