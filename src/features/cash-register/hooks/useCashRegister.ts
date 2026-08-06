import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { cashRegisterApi } from "../../../api/cash-register.api";

import type {
  CashMovement,
  CashMovementType,
  CashRegisterSession,
} from "../../../types/cash-register";

export function useCashRegister() {
  const [session, setSession] =
    useState<CashRegisterSession | null>(null);

  const [history, setHistory] =
    useState<CashRegisterSession[]>([]);

  const [movements, setMovements] =
    useState<CashMovement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const loadCurrentSession = useCallback(
    async () => {
      try {
        const data =
          await cashRegisterApi.getCurrent();

        if (
          !data?.id ||
          data.status !== "OPEN"
        ) {
          setSession(null);
          return;
        }

        setSession(data);
      } catch {
        setSession(null);
      }
    },
    []
  );

  const loadHistory = useCallback(
    async () => {
      try {
        const data =
          await cashRegisterApi.getHistory();

        setHistory(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Failed to load cash register history",
          error
        );

        setHistory([]);
      }
    },
    []
  );

  const loadMovements = useCallback(
    async () => {
      try {
        const data =
          await cashRegisterApi.getMovements();

        setMovements(
          Array.isArray(data) ? data : []
        );
      } catch {
        setMovements([]);
      }
    },
    []
  );

  const refreshCashRegister = useCallback(
    async () => {
      try {
        setLoading(true);

        await Promise.all([
          loadCurrentSession(),
          loadHistory(),
        ]);

        await loadMovements();
      } finally {
        setLoading(false);
      }
    },
    [
      loadCurrentSession,
      loadHistory,
      loadMovements,
    ]
  );

  useEffect(() => {
    refreshCashRegister();
  }, [refreshCashRegister]);

  const openSession = async (
    openingBalance: number
  ): Promise<boolean> => {
    try {
      setActionLoading(true);

      await cashRegisterApi.open({
        openingBalance,
      });

      toast.success(
        "Cash register opened successfully"
      );

      await refreshCashRegister();

      return true;
    } catch (error) {
      console.error(
        "Failed to open cash register",
        error
      );

      toast.error(
        "Failed to open cash register"
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const closeSession = async (
    closingBalance: number
  ): Promise<boolean> => {
    try {
      setActionLoading(true);

      await cashRegisterApi.close({
        closingBalance,
      });

      toast.success(
        "Cash register closed successfully"
      );

      await refreshCashRegister();

      return true;
    } catch (error) {
      console.error(
        "Failed to close cash register",
        error
      );

      toast.error(
        "Failed to close cash register"
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const createMovement = async (data: {
    type: CashMovementType;
    amount: number;
    reason: string;
  }): Promise<boolean> => {
    if (data.amount <= 0) {
      toast.error(
        "Movement amount must be greater than zero"
      );

      return false;
    }

    if (!data.reason.trim()) {
      toast.error("Reason is required");

      return false;
    }

    try {
      setActionLoading(true);

      await cashRegisterApi.createMovement({
        type: data.type,
        amount: data.amount,
        reason: data.reason.trim(),
      });

      toast.success(
        "Cash movement saved successfully"
      );

      await loadMovements();

      return true;
    } catch (error) {
      console.error(
        "Failed to save cash movement",
        error
      );

      toast.error(
        "Failed to save cash movement"
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    session,
    history,
    movements,

    loading,
    actionLoading,

    refreshCashRegister,
    openSession,
    closeSession,
    createMovement,
  };
}