import { useState } from "react";
import { Banknote } from "lucide-react";

import type {
  CashRegisterSession,
} from "../../../types/cash-register";

import { StatusBadge } from "../../../shared/components/StatusBadge";

interface CurrentCashSessionProps {
  session: CashRegisterSession | null;
  actionLoading: boolean;

  onOpen: (
    openingBalance: number
  ) => Promise<boolean>;

  onClose: (
    closingBalance: number
  ) => Promise<boolean>;

  canOperate: boolean;
}

function formatMoney(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} MAD`;
}

export function CurrentCashSession({
  session,
  actionLoading,
  onOpen,
  onClose,
  canOperate,
}: CurrentCashSessionProps) {
  const [openingBalance, setOpeningBalance] =
    useState(500);

  const [closingBalance, setClosingBalance] =
    useState(500);

  const hasOpenSession =
    session?.status === "OPEN";

  return (
    <div className="cash-register-summary-grid">
      <section className="panel cash-session-card">
        <div className="cash-section-title">
          <div className="cash-section-icon">
            <Banknote size={20} />
          </div>

          <div>
            <h3>Current Session</h3>

            <p>
              Current cash register status and balance.
            </p>
          </div>
        </div>

        {hasOpenSession && session ? (
          <div className="cash-session-details">
            <div>
              <span>Status</span>

              <StatusBadge variant="success">
                {session.status}
              </StatusBadge>
            </div>

            <div>
              <span>Opened by</span>

              <strong>
                {session.openedByName}
              </strong>
            </div>

            <div>
              <span>Opened at</span>

              <strong>
                {new Date(
                  session.openedAt
                ).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Opening balance</span>

              <strong>
                {formatMoney(
                  session.openingBalance
                )}
              </strong>
            </div>
          </div>
        ) : (
          <div className="cash-register-empty">
            No open cash register session.
          </div>
        )}
      </section>

      {canOperate && (
        <section className="panel cash-action-card">
          {hasOpenSession ? (
            <>
              <h3>Close Session</h3>

              <p>
                Enter the real amount available in the
                cash register.
              </p>

              <label className="cash-form-field">
                Closing Balance

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={closingBalance}
                  onChange={(event) =>
                    setClosingBalance(
                      Number(event.target.value)
                    )
                  }
                />
              </label>

              <button
                type="button"
                className="primary-button"
                disabled={actionLoading}
                onClick={() =>
                  onClose(closingBalance)
                }
              >
                {actionLoading
                  ? "Closing..."
                  : "Close Cash Register"}
              </button>
            </>
          ) : (
            <>
              <h3>Open Session</h3>

              <p>
                Enter the opening cash balance to start
                the register session.
              </p>

              <label className="cash-form-field">
                Opening Balance

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={openingBalance}
                  onChange={(event) =>
                    setOpeningBalance(
                      Number(event.target.value)
                    )
                  }
                />
              </label>

              <button
                type="button"
                className="primary-button"
                disabled={actionLoading}
                onClick={() =>
                  onOpen(openingBalance)
                }
              >
                {actionLoading
                  ? "Opening..."
                  : "Open Cash Register"}
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
}