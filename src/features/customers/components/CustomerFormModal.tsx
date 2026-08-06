import { BaseModal } from "../../../shared/components/BaseModal";

interface CustomerFormModalProps {
  onClose: () => void;
}

export function CustomerFormModal({
  onClose,
}: CustomerFormModalProps) {
  return (
    <BaseModal
      title="Add Customer"
      description="Customer creation will be connected to the customer API."
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
      <div className="customers-modal-message">
        Customer form is not connected yet.
      </div>
    </BaseModal>
  );
}