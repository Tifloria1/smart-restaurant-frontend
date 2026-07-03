import { useEffect, useState } from "react";
import { orderApi } from "../../api/order.api";
import { paymentApi } from "../../api/payment.api";
import type { Order } from "../../types/order";
import type { PaymentMethod } from "../../types/payment";
import { toast } from "sonner";

export function PaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [method, setMethod] = useState<PaymentMethod>("CASH");

  const loadOrders = async () => {
    const data = await orderApi.getAll();
    setOrders(data.filter((order) => order.status === "PENDING"));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const payOrder = async (orderId: number) => {
    try {
      await paymentApi.payOrder(orderId, { method });
      toast.success("Payment completed successfully");
      await loadOrders();
    } catch {
      toast.error("Payment failed. Make sure all tickets are delivered.");
    }
  };

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Payments</h2>
          <p>Validate pending orders and generate invoices.</p>
        </div>

        <select
          className="cart-select small"
          value={method}
          onChange={(e) => setMethod(e.target.value as PaymentMethod)}
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
        </select>
      </div>

      <div className="panel">
        <table className="data-table">
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.tableNumber ?? "-"}</td>
                <td>{order.items.length}</td>
                <td>{order.totalAmount} MAD</td>
                <td>{method}</td>
                <td>
                  <button
                    className="primary-button"
                    onClick={() => payOrder(order.id)}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="muted">No pending orders ready for payment.</p>
        )}
      </div>
    </div>
  );
}