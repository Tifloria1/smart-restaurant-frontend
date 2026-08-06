import { useState } from "react";

import type {
  CashMovementType,
} from "../../../types/cash-register";

interface CashMovementFormProps {
  actionLoading: boolean;

  onSubmit: (data: {
    type: CashMovementType;
    amount: number;
    reason: string;
  }) => Promise<boolean>;
}

export function CashMovementForm({
  actionLoading,
  onSubmit,
}: CashMovementFormProps) {
  const [type, setType] =
    useState<CashMovementType>("CASH_IN");

  const [amount, setAmount] =
    useState(100);

  const [reason, setReason] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const saved = await onSubmit({
      type,
      amount,
      reason,
    });

    if (saved) {
      setAmount(100);
      setReason("");
    }
  };

  return (
    <section className="panel">
      <h3>Cash In / Cash Out</h3>

      <p className="cash-section-description">
        Register manual cash movements for the
        current session.
      </p>

      <form
        className="cash-movement-form"
        onSubmit={handleSubmit}
      >
        <label className="cash-form-field">
          Movement Type

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target
                  .value as CashMovementType
              )
            }
          >
            <option value="CASH_IN">
              Cash In
            </option>

            <option value="CASH_OUT">
              Cash Out
            </option>
          </select>
        </label>

        <label className="cash-form-field">
          Amount

          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) =>
              setAmount(
                Number(event.target.value)
              )
            }
          />
        </label>

        <label className="cash-form-field">
          Reason

          <input
            required
            value={reason}
            placeholder="Example: Buy supplies"
            onChange={(event) =>
              setReason(event.target.value)
            }
          />
        </label>

        <button
          type="submit"
          className="primary-button"
          disabled={actionLoading}
        >
          {actionLoading
            ? "Saving..."
            : "Save Movement"}
        </button>
      </form>
    </section>
  );
}