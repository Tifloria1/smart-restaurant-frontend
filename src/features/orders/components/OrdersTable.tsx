import {
  Ban,
  ClipboardList,
} from "lucide-react";

import type { Order } from "../../../types/order";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface OrdersTableProps {
  orders: Order[];
  cancellingId: number | null;

  onCancel: (
    order: Order
  ) => Promise<void>;
}

function getStatusVariant(
  status: Order["status"]
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

function getOrderTypeLabel(
  orderType: Order["orderType"]
) {
  return orderType === "SUR_PLACE"
    ? "Dine-in"
    : "Takeaway";
}

export function OrdersTable({
  orders,
  cancellingId,
  onCancel,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders found"
        description="New restaurant orders will appear here."
        icon={<ClipboardList size={22} />}
      />
    );
  }

  return (
    <div className="orders-table-wrapper">
      <table className="data-table orders-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Type</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const isCancelling =
              cancellingId === order.id;

            return (
              <tr key={order.id}>
                <td>
                  <strong>
                    #{order.id}
                  </strong>

                  <p className="orders-item-count">
                    {order.items.length} item
                    {order.items.length === 1
                      ? ""
                      : "s"}
                  </p>
                </td>

                <td>
                  {getOrderTypeLabel(
                    order.orderType
                  )}
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

                <td>
                  {order.status === "PENDING" ? (
                    <button
                      type="button"
                      className="orders-cancel-button"
                      disabled={isCancelling}
                      onClick={() =>
                        onCancel(order)
                      }
                    >
                      <Ban size={15} />

                      {isCancelling
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  ) : (
                    <span className="orders-no-action">
                      —
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}