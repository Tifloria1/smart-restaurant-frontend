import {
  CreditCard,
  RefreshCw,
} from "lucide-react";

import "../styles/payments.css";

import { PaymentTable } from "../components/PaymentTable";
import { usePayments } from "../hooks/usePayments";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

import type { PaymentMethod } from "../../../types/payment";

export function PaymentsPage() {
  const {
    orders,
    method,
    loading,
    payingId,

    setMethod,
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
            <div className="payments-method-control">
              <CreditCard size={17} />

              <select
                value={method}
                onChange={(event) =>
                  setMethod(
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
            </div>

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
          method={method}
          payingId={payingId}
          onPay={payOrder}
        />
      </div>
    </div>
  );
}