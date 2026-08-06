import "../styles/cash-register.css";

import { CashMovementForm } from "../components/CashMovementForm";
import { CashMovementsTable } from "../components/CashMovementsTable";
import { CashRegisterHistory } from "../components/CashRegisterHistory";
import { CurrentCashSession } from "../components/CurrentCashSession";

import { useCashRegister } from "../hooks/useCashRegister";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function CashRegisterPage() {
  const {
    session,
    history,
    movements,

    loading,
    actionLoading,

    refreshCashRegister,
    openSession,
    closeSession,
    createMovement,
  } = useCashRegister();

  if (loading) {
    return (
      <PageLoader message="Loading cash register..." />
    );
  }

  return (
    <div className="cash-register-page">
      <PageHeader
        title="Cash Register"
        description="Open, close and control cash register sessions."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={refreshCashRegister}
            disabled={actionLoading}
          >
            Refresh
          </button>
        }
      />

      <CurrentCashSession
        session={session}
        actionLoading={actionLoading}
        onOpen={openSession}
        onClose={closeSession}
      />

      {session?.status === "OPEN" && (
        <div className="cash-register-content-grid">
          <CashMovementForm
            actionLoading={actionLoading}
            onSubmit={createMovement}
          />

          <CashMovementsTable
            movements={movements}
          />
        </div>
      )}

      <CashRegisterHistory
        history={history}
      />
    </div>
  );
}