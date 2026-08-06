import { CreditCard } from "lucide-react";

import type { Order } from "../../../types/order";
import type { PaymentMethod } from "../../../types/payment";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface PaymentTableProps {
  orders: Order[];
  method: PaymentMethod;
  payingId: number | null;

  onPay: (
    orderId: number
  ) => Promise<void>;
}

export function PaymentTable({
  orders,
  method,
  payingId,
  onPay,
}: PaymentTableProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No pending payments"
        description="All available orders are already paid or cancelled."
        icon={<CreditCard size={22} />}
      />
    );
  }

  return (
    <div className="payments-table-wrapper">
      <table className="data-table payments-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Table</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const isPaying =
              payingId === order.id;

            return (
              <tr key={order.id}>
                <td>
                  <strong>
                    #{order.id}
                  </strong>
                </td>

                <td>
                  {order.tableNumber ?? "-"}
                </td>

                <td>
                  {order.items.length} item
                  {order.items.length === 1
                    ? ""
                    : "s"}
                </td>

                <td>
                  {Number(
                    order.totalAmount
                  ).toFixed(2)}{" "}
                  MAD
                </td>

                <td>
                  <StatusBadge variant="info">
                    {method}
                  </StatusBadge>
                </td>

                <td>
                  <button
                    type="button"
                    className="primary-button"
                    disabled={isPaying}
                    onClick={() =>
                      onPay(order.id)
                    }
                  >
                    {isPaying
                      ? "Paying..."
                      : "Pay"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}