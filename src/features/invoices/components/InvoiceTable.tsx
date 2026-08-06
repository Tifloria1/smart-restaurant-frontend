import {
  Download,
  FileText,
} from "lucide-react";

import type { Order } from "../../../types/order";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface InvoiceTableProps {
  invoices: Order[];
  downloadingId: number | null;

  onDownload: (
    orderId: number
  ) => Promise<void>;
}

export function InvoiceTable({
  invoices,
  downloadingId,
  onDownload,
}: InvoiceTableProps) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        title="No invoices found"
        description="Invoices will appear after an order is paid."
        icon={<FileText size={22} />}
      />
    );
  }

  return (
    <div className="invoices-table-wrapper">
      <table className="data-table invoices-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Order</th>
            <th>Customer</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((order) => {
            const isDownloading =
              downloadingId === order.id;

            return (
              <tr key={order.id}>
                <td>
                  <div className="invoice-main-cell">
                    <div className="invoice-icon">
                      <FileText size={17} />
                    </div>

                    <strong>
                      INV-{order.id}
                    </strong>
                  </div>
                </td>

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
                  <StatusBadge variant="success">
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
                  <button
                    type="button"
                    className="icon-action"
                    aria-label={`Download invoice for order ${order.id}`}
                    title={`Download invoice #${order.id}`}
                    disabled={isDownloading}
                    onClick={() =>
                      onDownload(order.id)
                    }
                  >
                    {isDownloading ? (
                      <span className="button-loading-text">
                        ...
                      </span>
                    ) : (
                      <Download size={16} />
                    )}
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