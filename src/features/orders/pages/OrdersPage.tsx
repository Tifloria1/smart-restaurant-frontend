import { RefreshCw } from "lucide-react";

import "../styles/orders.css";

import { OrdersTable } from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function OrdersPage() {
  const {
    orders,
    loading,
    cancellingId,

    loadOrders,
    cancelOrder,
  } = useOrders();

  if (loading) {
    return (
      <PageLoader message="Loading orders..." />
    );
  }

  return (
    <div className="orders-page">
      <PageHeader
        title="Orders"
        description="View restaurant orders, statuses and totals."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={loadOrders}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <div className="panel">
        <OrdersTable
          orders={orders}
          cancellingId={cancellingId}
          onCancel={cancelOrder}
        />
      </div>
    </div>
  );
}