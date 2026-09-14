import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

import { BaseModal } from "../../../shared/components/BaseModal";
import { EmptyState } from "../../../shared/components/EmptyState";

import { cashRegisterApi } from "../../../api/cash-register.api";
import { paymentApi } from "../../../api/payment.api";

import type {
  CashMovement,
  CashRegisterSession,
} from "../../../types/cash-register";

import type { Payment } from "../../../types/payment";

interface CashRegisterSessionDetailsModalProps {
  session: CashRegisterSession;
  onClose: () => void;
}

function formatMoney(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} MAD`;
}

export function CashRegisterSessionDetailsModal({
  session,
  onClose,
}: CashRegisterSessionDetailsModalProps) {
  const [movements, setMovements] =
    useState<CashMovement[]>([]);

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loadingMovements, setLoadingMovements] =
    useState(true);

  const [loadingPayments, setLoadingPayments] =
    useState(true);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        setLoadingMovements(true);

        const data =
          await cashRegisterApi.getMovementsBySession(
            session.id
          );

        setMovements(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Failed to load session movements",
          error
        );

        toast.error(
          "Failed to load cash movements"
        );

        setMovements([]);
      } finally {
        setLoadingMovements(false);
      }
    };

    const loadPayments = async () => {
      try {
        setLoadingPayments(true);

        const data =
          await paymentApi
            .getPaymentsByCashRegisterSession(
              session.id
            );

        setPayments(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Failed to load session payments",
          error
        );

        toast.error(
          "Failed to load session payments"
        );

        setPayments([]);
      } finally {
        setLoadingPayments(false);
      }
    };

    void loadMovements();
    void loadPayments();
  }, [session.id]);

  /*
   * CASH MOVEMENT TOTALS
   */

  const totalCashIn = useMemo(
    () =>
      movements
        .filter(
          (movement) =>
            movement.type === "CASH_IN"
        )
        .reduce(
          (sum, movement) =>
            sum + Number(movement.amount),
          0
        ),
    [movements]
  );

  const totalCashOut = useMemo(
    () =>
      movements
        .filter(
          (movement) =>
            movement.type === "CASH_OUT"
        )
        .reduce(
          (sum, movement) =>
            sum + Number(movement.amount),
          0
        ),
    [movements]
  );

  /*
   * SALES TOTALS
   */

  const paidPayments = useMemo(
    () =>
      payments.filter(
        (payment) =>
          payment.status === "PAID"
      ),
    [payments]
  );

  const totalCashSales = useMemo(
    () =>
      paidPayments
        .filter(
          (payment) =>
            payment.method === "CASH"
        )
        .reduce(
          (sum, payment) =>
            sum + Number(payment.amount),
          0
        ),
    [paidPayments]
  );

  const totalCardSales = useMemo(
    () =>
      paidPayments
        .filter(
          (payment) =>
            payment.method === "CARD"
        )
        .reduce(
          (sum, payment) =>
            sum + Number(payment.amount),
          0
        ),
    [paidPayments]
  );

  const totalSales = useMemo(
    () =>
      paidPayments.reduce(
        (sum, payment) =>
          sum + Number(payment.amount),
        0
      ),
    [paidPayments]
  );

  return (
    <BaseModal
      title={`Cash Register Session #${session.id}`}
      description="Review sales, cash movements and closing information."
      onClose={onClose}
      size="large"
      footer={
        <button
          type="button"
          className="secondary-button"
          onClick={onClose}
        >
          Close
        </button>
      }
    >
      <div className="cash-history-details">

        {/* ================================
            SESSION SUMMARY
        ================================= */}

        <div className="cash-history-summary-grid">
          <div className="cash-history-summary-card">
            <span>Opened By</span>
            <strong>
              {session.openedByName}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Closed By</span>
            <strong>
              {session.closedByName || "-"}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Opening Balance</span>
            <strong>
              {formatMoney(
                session.openingBalance
              )}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Closing Balance</span>
            <strong>
              {formatMoney(
                session.closingBalance
              )}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Expected Balance</span>
            <strong>
              {formatMoney(
                session.expectedBalance
              )}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Difference</span>

            <strong
              className={
                Number(
                  session.differenceAmount || 0
                ) === 0
                  ? "cash-difference-neutral"
                  : Number(
                        session.differenceAmount || 0
                      ) > 0
                    ? "cash-difference-positive"
                    : "cash-difference-negative"
              }
            >
              {formatMoney(
                session.differenceAmount
              )}
            </strong>
          </div>
        </div>

        {/* ================================
            PERIOD
        ================================= */}

        <div className="cash-history-period">
          <div>
            <span>Opened At</span>

            <strong>
              {new Date(
                session.openedAt
              ).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Closed At</span>

            <strong>
              {session.closedAt
                ? new Date(
                    session.closedAt
                  ).toLocaleString()
                : "-"}
            </strong>
          </div>
        </div>

        {/* ================================
            SALES SUMMARY
        ================================= */}

        <div className="cash-history-section-header">
          <h3>Sales Summary</h3>
          <p>
            Payments recorded during this cash
            register session.
          </p>
        </div>

        <div className="cash-history-summary-grid">
          <div className="cash-history-summary-card">
            <span>Cash Sales</span>

            <strong>
              {formatMoney(totalCashSales)}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Card Sales</span>

            <strong>
              {formatMoney(totalCardSales)}
            </strong>
          </div>

          <div className="cash-history-summary-card">
            <span>Total Sales</span>

            <strong>
              {formatMoney(totalSales)}
            </strong>
          </div>
        </div>

        {/* ================================
            SALES / PAYMENTS TABLE
        ================================= */}

        <div className="cash-history-movements-section">
          <div className="cash-history-section-header">
            <h3>Sales / Payments</h3>

            <p>
              Orders paid during this register
              session.
            </p>
          </div>

          {loadingPayments ? (
            <p className="muted">
              Loading payments...
            </p>
          ) : payments.length === 0 ? (
            <EmptyState
              title="No sales"
              description="No payments were recorded during this session."
            />
          ) : (
            <div className="cash-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Paid At</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map(
                    (payment) => (
                      <tr key={payment.id}>
                        <td>
                          <strong>
                            #{payment.orderId}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={
                              payment.method ===
                              "CASH"
                                ? "cash-history-payment-method cash-history-payment-method--cash"
                                : "cash-history-payment-method cash-history-payment-method--card"
                            }
                          >
                            {payment.method ===
                            "CASH" ? (
                              <Banknote
                                size={14}
                              />
                            ) : (
                              <CreditCard
                                size={14}
                              />
                            )}

                            {payment.method}
                          </span>
                        </td>

                        <td>
                          {formatMoney(
                            payment.amount
                          )}
                        </td>

                        <td>
                          <span className="status-badge status-badge--success">
                            {payment.status}
                          </span>
                        </td>

                        <td>
                          {new Date(
                            payment.paidAt
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================================
            CASH IN / CASH OUT SUMMARY
        ================================= */}

        <div className="cash-history-movement-totals">
          <div className="cash-history-total-card">
            <div className="cash-history-total-icon cash-history-total-icon--in">
              <ArrowDownLeft size={18} />
            </div>

            <div>
              <span>Total Cash In</span>

              <strong>
                {formatMoney(totalCashIn)}
              </strong>
            </div>
          </div>

          <div className="cash-history-total-card">
            <div className="cash-history-total-icon cash-history-total-icon--out">
              <ArrowUpRight size={18} />
            </div>

            <div>
              <span>Total Cash Out</span>

              <strong>
                {formatMoney(totalCashOut)}
              </strong>
            </div>
          </div>
        </div>

        {/* ================================
            CASH MOVEMENTS TABLE
        ================================= */}

        <div className="cash-history-movements-section">
          <div className="cash-history-section-header">
            <h3>Cash Movements</h3>

            <p>
              Manual cash in and cash out
              operations recorded during this
              session.
            </p>
          </div>

          {loadingMovements ? (
            <p className="muted">
              Loading movements...
            </p>
          ) : movements.length === 0 ? (
            <EmptyState
              title="No cash movements"
              description="No manual cash movements were recorded during this session."
            />
          ) : (
            <div className="cash-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Created By</th>
                  </tr>
                </thead>

                <tbody>
                  {movements.map(
                    (movement) => (
                      <tr key={movement.id}>
                        <td>
                          {new Date(
                            movement.createdAt
                          ).toLocaleString()}
                        </td>

                        <td>
                          <span
                            className={
                              movement.type ===
                              "CASH_IN"
                                ? "cash-history-movement-badge cash-history-movement-badge--in"
                                : "cash-history-movement-badge cash-history-movement-badge--out"
                            }
                          >
                            {movement.type}
                          </span>
                        </td>

                        <td>
                          {formatMoney(
                            movement.amount
                          )}
                        </td>

                        <td>
                          {movement.reason || "-"}
                        </td>

                        <td>
                          {movement.createdByName ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}