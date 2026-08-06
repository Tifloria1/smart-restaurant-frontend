import { ReceiptText } from "lucide-react";

import type {
  RecentPaidOrder,
} from "../../../types/report";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface RecentPaidOrdersTableProps {
  orders: RecentPaidOrder[];
}

function getStatusVariant(
  status: string
): "success" | "danger" | "warning" | "info" | "neutral" {
  switch (status) {
    case "PAID":
      return "success";

    case "CANCELLED":
      return "danger";

    case "PENDING":
      return "warning";

    default:
      return "neutral";
  }
}

export function RecentPaidOrdersTable({
  orders,
}: RecentPaidOrdersTableProps) {
  if (orders.length === 0) {
    return (
      <section className="panel">
        <EmptyState
          title="No paid orders found"
          description="Paid orders from the selected period will appear here."
          icon={<ReceiptText size={22} />}
        />
      </section>
    );
  }

  return (
    <section className="panel report-orders-section">
      <h3>Recent Paid Orders</h3>

      <div className="report-orders-table-wrapper">
        <table className="data-table report-orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>
                    #{order.id}
                  </strong>
                </td>

                <td>
                  {order.customerName ?? "-"}
                </td>

                <td>
                  {order.tableNumber ?? "-"}
                </td>

                <td>
                  <StatusBadge
                    variant={getStatusVariant(
                      order.status
                    )}
                  >
                    {order.status}
                  </StatusBadge>
                </td>

                <td>
                  {Number(
                    order.totalAmount
                  ).toFixed(2)}{" "}
                  MAD
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}