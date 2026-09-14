import {
  RefreshCw,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import "../styles/orders.css";

import { OrdersTable } from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

import type { Order } from "../../../types/order";

export function OrdersPage() {
  const {
    orders,
    freeTables,

    loading,
    cancellingId,
    transferringId,

    loadOrders,
    cancelOrder,
    transferOrder,
  } = useOrders();

  const [
    transferOrderSelected,
    setTransferOrderSelected,
  ] =
    useState<Order | null>(
      null
    );

  const [
    targetTableId,
    setTargetTableId,
  ] =
    useState<number | null>(
      null
    );

  // =========================================================
  // OPEN TRANSFER MODAL
  // =========================================================

  const openTransferModal = (
    order: Order
  ) => {
    setTransferOrderSelected(
      order
    );

    setTargetTableId(null);
  };

  // =========================================================
  // CLOSE TRANSFER MODAL
  // =========================================================

  const closeTransferModal =
    () => {
      if (
        transferringId !==
        null
      ) {
        return;
      }

      setTransferOrderSelected(
        null
      );

      setTargetTableId(null);
    };

  // =========================================================
  // CONFIRM TRANSFER
  // =========================================================

  const handleTransfer =
    async () => {
      if (
        !transferOrderSelected ||
        !targetTableId
      ) {
        return;
      }

      const success =
        await transferOrder(
          transferOrderSelected,
          targetTableId
        );

      if (success) {
        setTransferOrderSelected(
          null
        );

        setTargetTableId(
          null
        );
      }
    };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <PageLoader message="Loading orders..." />
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="orders-page">
      <PageHeader
        title="Orders"
        description="View restaurant orders, statuses and totals."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={
              loadOrders
            }
          >
            <RefreshCw
              size={16}
            />
            Refresh
          </button>
        }
      />

      <div className="panel">
        <OrdersTable
          orders={orders}
          cancellingId={
            cancellingId
          }
          transferringId={
            transferringId
          }
          onCancel={
            cancelOrder
          }
          onTransfer={
            openTransferModal
          }
        />
      </div>

      {/* ===================================================
          TRANSFER MODAL
      =================================================== */}

      {transferOrderSelected && (
        <div className="orders-modal-backdrop">
          <div className="orders-transfer-modal">
            <div className="orders-transfer-modal-header">
              <div>
                <h2>
                  Transfer Order #
                  {
                    transferOrderSelected.id
                  }
                </h2>

                <p>
                  Move this order
                  to another
                  available table.
                </p>
              </div>

              <button
                type="button"
                className="orders-modal-close"
                onClick={
                  closeTransferModal
                }
                disabled={
                  transferringId !==
                  null
                }
              >
                <X
                  size={18}
                />
              </button>
            </div>

            <div className="orders-transfer-modal-body">
              <div className="orders-transfer-current">
                <span>
                  Current table
                </span>

                <strong>
                  {transferOrderSelected.tableNumber ??
                    "-"}
                </strong>
              </div>

              <label
                htmlFor="target-table"
                className="orders-transfer-label"
              >
                Move to
              </label>

              <select
                id="target-table"
                value={
                  targetTableId ??
                  ""
                }
                disabled={
                  transferringId !==
                  null
                }
                onChange={(
                  event
                ) =>
                  setTargetTableId(
                    event.target
                      .value
                      ? Number(
                          event
                            .target
                            .value
                        )
                      : null
                  )
                }
              >
                <option value="">
                  Select a free
                  table
                </option>

                {freeTables.map(
                  (table) => (
                    <option
                      key={
                        table.id
                      }
                      value={
                        table.id
                      }
                    >
                      {
                        table.tableNumber
                      }{" "}
                      —{" "}
                      {
                        table.capacity
                      }{" "}
                      seats
                    </option>
                  )
                )}
              </select>

              {freeTables.length ===
                0 && (
                <p className="orders-no-free-tables">
                  No free tables
                  are currently
                  available.
                </p>
              )}
            </div>

            <div className="orders-transfer-modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  closeTransferModal
                }
                disabled={
                  transferringId !==
                  null
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={
                  handleTransfer
                }
                disabled={
                  !targetTableId ||
                  transferringId !==
                    null
                }
              >
                {transferringId !==
                null
                  ? "Transferring..."
                  : "Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}