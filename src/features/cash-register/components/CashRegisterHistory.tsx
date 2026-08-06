import { History } from "lucide-react";

import type {
  CashRegisterSession,
} from "../../../types/cash-register";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface CashRegisterHistoryProps {
  history: CashRegisterSession[];
}

function formatMoney(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} MAD`;
}

export function CashRegisterHistory({
  history,
}: CashRegisterHistoryProps) {
  if (history.length === 0) {
    return (
      <section className="panel">
        <EmptyState
          title="No cash register history"
          description="Closed and active register sessions will appear here."
          icon={<History size={22} />}
        />
      </section>
    );
  }

  return (
    <section className="panel">
      <h3>Cash Register History</h3>

      <div className="cash-table-wrapper">
        <table className="data-table cash-history-table">
          <thead>
            <tr>
              <th>Opened At</th>
              <th>Closed At</th>
              <th>Opened By</th>
              <th>Closed By</th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Expected</th>
              <th>Difference</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>
                  {new Date(
                    item.openedAt
                  ).toLocaleString()}
                </td>

                <td>
                  {item.closedAt
                    ? new Date(
                        item.closedAt
                      ).toLocaleString()
                    : "-"}
                </td>

                <td>{item.openedByName}</td>

                <td>
                  {item.closedByName || "-"}
                </td>

                <td>
                  {formatMoney(
                    item.openingBalance
                  )}
                </td>

                <td>
                  {formatMoney(
                    item.closingBalance
                  )}
                </td>

                <td>
                  {formatMoney(
                    item.expectedBalance
                  )}
                </td>

                <td>
                  <span
                    className={
                      Number(
                        item.differenceAmount || 0
                      ) === 0
                        ? "cash-difference-neutral"
                        : Number(
                              item.differenceAmount ||
                                0
                            ) > 0
                          ? "cash-difference-positive"
                          : "cash-difference-negative"
                    }
                  >
                    {formatMoney(
                      item.differenceAmount
                    )}
                  </span>
                </td>

                <td>
                  <StatusBadge
                    variant={
                      item.status === "OPEN"
                        ? "info"
                        : "success"
                    }
                  >
                    {item.status}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}