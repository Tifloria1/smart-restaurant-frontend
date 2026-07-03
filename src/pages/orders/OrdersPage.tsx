import { useEffect, useState } from "react";
import { orderApi } from "../../api/order.api";
import type { Order } from "../../types/order";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderApi.getAll().then(setOrders);
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2>Orders</h2>
        <p>View restaurant orders, status and totals.</p>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Type</th>
              <th>Table</th>
              <th>Status</th>
              <th>Total</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>#{order.id}</strong>
                  <p className="muted">{order.items.length} items</p>
                </td>
                <td>{order.orderType}</td>
                <td>{order.tableNumber ?? "-"}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.totalAmount} MAD</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && <p className="muted">No orders found.</p>}
      </div>
    </div>
  );
}