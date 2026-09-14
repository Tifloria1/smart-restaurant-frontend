import { useState } from "react";
import { CreditCard } from "lucide-react";

import type { Order } from "../../../types/order";
import type { PaymentMethod } from "../../../types/payment";

import { EmptyState } from "../../../shared/components/EmptyState";

interface PaymentTableProps {
  orders: Order[];
  payingId: number | null;

  onPay: (
    orderId: number,
    method: PaymentMethod
  ) => Promise<void>;
}

export function PaymentTable({
  orders,
  payingId,
  onPay,
}: PaymentTableProps) {
  const [methods, setMethods] = useState<
    Record<number, PaymentMethod>
  >({});

  const getMethod = (
    orderId: number
  ): PaymentMethod => {
    return methods[orderId] ?? "CASH";
  };

  const handleMethodChange = (
    orderId: number,
    method: PaymentMethod
  ) => {
    setMethods((current) => ({
      ...current,
      [orderId]: method,
    }));
  };

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

            const selectedMethod =
              getMethod(order.id);

            return (
              <tr key={order.id}>
                <td>
                  <strong>#{order.id}</strong>
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
                  <select
                    className="payment-method-select"
                    value={selectedMethod}
                    disabled={isPaying}
                    onChange={(event) =>
                      handleMethodChange(
                        order.id,
                        event.target
                          .value as PaymentMethod
                      )
                    }
                  >
                    <option value="CASH">
                      Cash
                    </option>

                    <option value="CARD">
                      Card
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    type="button"
                    className="primary-button"
                    disabled={isPaying}
                    onClick={() =>
                      onPay(
                        order.id,
                        selectedMethod
                      )
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