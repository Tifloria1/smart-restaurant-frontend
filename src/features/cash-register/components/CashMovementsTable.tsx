import {
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
} from "lucide-react";

import type {
  CashMovement,
} from "../../../types/cash-register";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface CashMovementsTableProps {
  movements: CashMovement[];
}

export function CashMovementsTable({
  movements,
}: CashMovementsTableProps) {
  if (movements.length === 0) {
    return (
      <section className="panel">
        <EmptyState
          title="No cash movements"
          description="Cash movements for the current session will appear here."
          icon={<ReceiptText size={22} />}
        />
      </section>
    );
  }

  return (
    <section className="panel">
      <h3>Current Session Movements</h3>

      <div className="cash-table-wrapper">
        <table className="data-table cash-movements-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Created By</th>
            </tr>
          </thead>

          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>
                  {new Date(
                    movement.createdAt
                  ).toLocaleString()}
                </td>

                <td>
                  <StatusBadge
                    variant={
                      movement.type === "CASH_IN"
                        ? "success"
                        : "danger"
                    }
                  >
                    <span className="cash-movement-type">
                      {movement.type === "CASH_IN" ? (
                        <ArrowDownLeft size={14} />
                      ) : (
                        <ArrowUpRight size={14} />
                      )}

                      {movement.type}
                    </span>
                  </StatusBadge>
                </td>

                <td>
                  {Number(
                    movement.amount
                  ).toFixed(2)}{" "}
                  MAD
                </td>

                <td>{movement.reason}</td>

                <td>
                  {movement.createdByName || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}