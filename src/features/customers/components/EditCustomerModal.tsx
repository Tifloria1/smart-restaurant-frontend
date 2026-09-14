import { useState } from "react";
import { toast } from "sonner";

import { BaseModal } from "../../../shared/components/BaseModal";

import {
  customerApi,
  type UpdateCustomerRequest,
} from "../../../api/customer.api";

import type {
  Customer,
} from "../../../types/customer";

interface EditCustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

export function EditCustomerModal({
  customer,
  onClose,
  onUpdated,
}: EditCustomerModalProps) {
  const [form, setForm] =
    useState<UpdateCustomerRequest>({
      fullName: customer.fullName,
      phone: customer.phone ?? "",
      email: customer.email ?? "",
      address: customer.address ?? "",
      active: customer.active,
    });

  const [saving, setSaving] =
    useState(false);

  const updateField = (
    field: keyof UpdateCustomerRequest,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.fullName.trim()) {
      toast.error(
        "Customer name is required"
      );

      return;
    }

    try {
      setSaving(true);

      await customerApi.update(
        customer.id,
        {
          ...form,
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
        }
      );

      toast.success(
        "Customer updated successfully"
      );

      await onUpdated();

      onClose();
    } catch (error) {
      console.error(
        "Failed to update customer",
        error
      );

      toast.error(
        "Failed to update customer"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseModal
      title="Edit Customer"
      description="Update customer information and status."
      onClose={onClose}
      size="small"
    >
      <form
        className="customer-form"
        onSubmit={handleSubmit}
      >
        <div className="customer-form-field">
          <label htmlFor="edit-customer-name">
            Full Name
            <span className="required-mark">
              *
            </span>
          </label>

          <input
            id="edit-customer-name"
            type="text"
            maxLength={120}
            value={form.fullName}
            onChange={(event) =>
              updateField(
                "fullName",
                event.target.value
              )
            }
          />
        </div>

        <div className="customer-form-grid">
          <div className="customer-form-field">
            <label htmlFor="edit-customer-phone">
              Phone
            </label>

            <input
              id="edit-customer-phone"
              type="tel"
              maxLength={30}
              value={form.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
            />
          </div>

          <div className="customer-form-field">
            <label htmlFor="edit-customer-email">
              Email
            </label>

            <input
              id="edit-customer-email"
              type="email"
              maxLength={150}
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="customer-form-field">
          <label htmlFor="edit-customer-address">
            Address
          </label>

          <input
            id="edit-customer-address"
            type="text"
            maxLength={255}
            value={form.address}
            onChange={(event) =>
              updateField(
                "address",
                event.target.value
              )
            }
          />
        </div>

        <div className="customer-form-field">
          <label htmlFor="edit-customer-status">
            Status
          </label>

          <select
            id="edit-customer-status"
            value={
              form.active
                ? "active"
                : "inactive"
            }
            onChange={(event) =>
              updateField(
                "active",
                event.target.value ===
                  "active"
              )
            }
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="customer-form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}