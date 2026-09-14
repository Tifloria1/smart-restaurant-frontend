import { RefreshCw } from "lucide-react";

import "../styles/payments.css";

import { PaymentTable } from "../components/PaymentTable";
import { usePayments } from "../hooks/usePayments";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function PaymentsPage() {
  const {
    orders,
    loading,
    payingId,
    loadOrders,
    payOrder,
  } = usePayments();

  if (loading) {
    return (
      <PageLoader message="Loading payments..." />
    );
  }

  return (
    <div className="payments-page">
      <PageHeader
        title="Payments"
        description="Validate pending orders and generate invoices."
        actions={
          <div className="payments-header-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={loadOrders}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        }
      />

      <div className="panel">
        <PaymentTable
          orders={orders}
          payingId={payingId}
          onPay={payOrder}
        />
      </div>
    </div>
  );
}