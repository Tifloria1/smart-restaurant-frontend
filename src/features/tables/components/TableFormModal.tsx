import { BaseModal } from "../../../shared/components/BaseModal";

interface TableFormModalProps {
  onClose: () => void;
}

export function TableFormModal({
  onClose,
}: TableFormModalProps) {
  return (
    <BaseModal
      title="Add Table"
      description="Create and configure a new dining table."
      onClose={onClose}
      size="small"
      footer={
        <button
          type="button"
          className="secondary-button"
          onClick={onClose}
        >
          Close
        </button>
      }
    >
      <div className="tables-modal-message">
        Table creation form is not connected yet.
      </div>
    </BaseModal>
  );
}