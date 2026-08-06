import { ClipboardList } from "lucide-react";

import type {
  RecentOrder,
} from "../../../types/dashboard";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

function getStatusVariant(
  status: string
):
  | "success"
  | "danger"
  | "warning"
  | "neutral" {
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

export function RecentOrdersTable({
  orders,
}: RecentOrdersTableProps) {
  if (orders.length === 0) {
    return (
      <section className="panel">
        <EmptyState
          title="No recent orders"
          description="Recent restaurant orders will appear here."
          icon={<ClipboardList size={22} />}
        />
      </section>
    );
  }

  return (
    <section className="panel dashboard-recent-orders">
      <h3>Recent Orders</h3>

      <div className="dashboard-table-wrapper">
        <table className="data-table dashboard-orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Status</th>
              <th>Total</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}