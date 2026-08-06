import type { ReactNode } from "react";

interface BaseModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  size?: "small" | "medium" | "large";
}

export function BaseModal({
  title,
  description,
  children,
  footer,
  onClose,
  size = "medium",
}: BaseModalProps) {
  return (
    <div
      className="shared-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={`shared-modal shared-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shared-modal-title"
      >
        <div className="shared-modal__header">
          <div>
            <h3 id="shared-modal-title">
              {title}
            </h3>

            {description && (
              <p>{description}</p>
            )}
          </div>

          <button
            type="button"
            className="shared-modal__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="shared-modal__body">
          {children}
        </div>

        {footer && (
          <div className="shared-modal__footer">
            {footer}
          </div>
        )}
      </section>
    </div>
  );
}