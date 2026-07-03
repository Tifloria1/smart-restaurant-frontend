import { useEffect, useState } from "react";
import { cashRegisterApi } from "../../api/cash-register.api";
import type { CashRegisterSession } from "../../types/cash-register";
import { toast } from "sonner";

export function CashRegisterPage() {
  const [session, setSession] = useState<CashRegisterSession | null>(null);
  const [openingBalance, setOpeningBalance] = useState(500);
  const [closingBalance, setClosingBalance] = useState(500);
  const [loading, setLoading] = useState(false);

  const loadCurrent = async () => {
    try {
      const data = await cashRegisterApi.getCurrent();
      setSession(data);
    } catch {
      setSession(null);
    }
  };

  useEffect(() => {
    loadCurrent();
  }, []);

  const openSession = async () => {
    setLoading(true);
    try {
      const data = await cashRegisterApi.open({ openingBalance });
      setSession(data);
      toast.success("Cash register opened");
    } finally {
      setLoading(false);
    }
  };

  const closeSession = async () => {
    setLoading(true);
    try {
      const data = await cashRegisterApi.close({ closingBalance });
      setSession(data);
      toast.success("Cash register closed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Cash Register</h2>
        <p>Open and close cash register sessions.</p>
      </div>

      <div className="cash-grid">
        <div className="panel">
          <h3>Current Session</h3>

          {session ? (
            <div className="cash-details">
              <p><strong>Status:</strong> {session.status}</p>
              <p><strong>Opened by:</strong> {session.openedByName}</p>
              <p><strong>Opened at:</strong> {new Date(session.openedAt).toLocaleString()}</p>
              <p><strong>Opening balance:</strong> {session.openingBalance} MAD</p>

              {session.status === "CLOSED" && (
                <>
                  <p><strong>Closing balance:</strong> {session.closingBalance} MAD</p>
                  <p><strong>Expected balance:</strong> {session.expectedBalance} MAD</p>
                  <p><strong>Difference:</strong> {session.differenceAmount} MAD</p>
                </>
              )}
            </div>
          ) : (
            <p className="muted">No open session.</p>
          )}
        </div>

        <div className="panel">
          {!session || session.status === "CLOSED" ? (
            <>
              <h3>Open Session</h3>
              <label className="form-label">
                Opening Balance
                <input
                  type="number"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(Number(e.target.value))}
                />
              </label>

              <button className="primary-button" onClick={openSession} disabled={loading}>
                Open Cash Register
              </button>
            </>
          ) : (
            <>
              <h3>Close Session</h3>
              <label className="form-label">
                Closing Balance
                <input
                  type="number"
                  value={closingBalance}
                  onChange={(e) => setClosingBalance(Number(e.target.value))}
                />
              </label>

              <button className="primary-button" onClick={closeSession} disabled={loading}>
                Close Cash Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}