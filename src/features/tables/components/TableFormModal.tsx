import { useState } from "react";
import { toast } from "sonner";

import { BaseModal } from "../../../shared/components/BaseModal";
import { tableApi } from "../../../api/table.api";

import type {
  DiningTable,
  TableStatus,
} from "../../../types/table";

interface TableFormModalProps {
  table?: DiningTable | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function TableFormModal({
  table,
  onClose,
  onSuccess,
}: TableFormModalProps) {
  const isEditing = Boolean(table);

  const [tableNumber, setTableNumber] =
    useState(table?.tableNumber ?? "");

  const [capacity, setCapacity] =
    useState(table?.capacity ?? 4);

  const [status, setStatus] =
    useState<TableStatus>(
      table?.status ?? "FREE"
    );

  const [saving, setSaving] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!tableNumber.trim()) {
      toast.error("Table number is required");
      return;
    }

    if (capacity < 1) {
      toast.error(
        "Capacity must be at least 1"
      );
      return;
    }

    try {
      setSaving(true);

      if (table) {
        await tableApi.update(table.id, {
          tableNumber: tableNumber.trim(),
          capacity,
          status,
        });
      } else {
        await tableApi.create({
          tableNumber: tableNumber.trim(),
          capacity,
        });
      }
    } catch (error) {
      console.error(
        "Failed to save dining table",
        error
      );

      toast.error(
        isEditing
          ? "Failed to update table"
          : "Failed to create table"
      );

      return;
    } finally {
      setSaving(false);
    }

    toast.success(
      isEditing
        ? "Table updated successfully"
        : "Table created successfully"
    );

    try {
      await onSuccess();
    } catch (error) {
      console.error(
        "Table saved but list refresh failed",
        error
      );
    }

    onClose();
  };

  return (
    <BaseModal
      title={
        isEditing
          ? "Edit Table"
          : "Add Table"
      }
      description={
        isEditing
          ? "Update dining table information."
          : "Create and configure a new dining table."
      }
      onClose={onClose}
      size="small"
      footer={
        <>
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
            form="table-form"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Table"}
          </button>
        </>
      }
    >
      <form
        id="table-form"
        className="table-form"
        onSubmit={handleSubmit}
      >
        <div className="table-form__field">
          <label htmlFor="table-number">
            Table Number
          </label>

          <input
            id="table-number"
            type="text"
            value={tableNumber}
            maxLength={20}
            placeholder="Example: T1"
            autoFocus
            onChange={(event) =>
              setTableNumber(
                event.target.value
              )
            }
          />
        </div>

        <div className="table-form__field">
          <label htmlFor="capacity">
            Capacity
          </label>

          <input
            id="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={(event) =>
              setCapacity(
                Number(event.target.value)
              )
            }
          />
        </div>

        {isEditing && (
          <div className="table-form__field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as TableStatus
                )
              }
            >
              <option value="FREE">
                Free
              </option>

              <option value="OCCUPIED">
                Occupied
              </option>

              <option value="RESERVED">
                Reserved
              </option>
            </select>
          </div>
        )}
      </form>
    </BaseModal>
  );
}