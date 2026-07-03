import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { orderApi } from "../../api/order.api";
import { paymentApi } from "../../api/payment.api";
import type { Order } from "../../types/order";

export function InvoicesPage() {
  const [paidOrders, setPaidOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderApi.getAll().then((orders) => {
      setPaidOrders(orders.filter((order) => order.status === "PAID"));
    });
  }, []);

  const downloadPdf = async (orderId: number) => {
    const blob = await paymentApi.downloadInvoicePdf(orderId);

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `invoice-${orderId}.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Invoices</h2>
        <p>Download generated invoices for paid orders.</p>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Table</th>
              <th>Total</th>
              <th>Date</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {paidOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.tableNumber ?? "-"}</td>
                <td>{order.totalAmount} MAD</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="icon-action"
                    onClick={() => downloadPdf(order.id)}
                  >
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paidOrders.length === 0 && <p className="muted">No invoices found.</p>}
      </div>
    </div>
  );
}