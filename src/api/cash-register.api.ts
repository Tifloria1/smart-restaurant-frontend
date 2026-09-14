import { api } from "./axios";

import type {
  CashMovement,
  CashRegisterSession,
  CloseCashRegisterRequest,
  CreateCashMovementRequest,
  OpenCashRegisterRequest,
} from "../types/cash-register";

export const cashRegisterApi = {
  getCurrent:
    async (): Promise<CashRegisterSession> => {
      const response =
        await api.get<CashRegisterSession>(
          "/cash-register-sessions/current"
        );

      return response.data;
    },

  open: async (
    request: OpenCashRegisterRequest
  ): Promise<CashRegisterSession> => {
    const response =
      await api.post<CashRegisterSession>(
        "/cash-register-sessions/open",
        request
      );

    return response.data;
  },

  close: async (
    request: CloseCashRegisterRequest
  ): Promise<CashRegisterSession> => {
    const response =
      await api.post<CashRegisterSession>(
        "/cash-register-sessions/close",
        request
      );

    return response.data;
  },

  getHistory:
    async (): Promise<CashRegisterSession[]> => {
      const response =
        await api.get<CashRegisterSession[]>(
          "/cash-register-sessions/history"
        );

      return response.data;
    },

  createMovement: async (
    request: CreateCashMovementRequest
  ): Promise<CashMovement> => {
    const response =
      await api.post<CashMovement>(
        "/cash-movements",
        request
      );

    return response.data;
  },

  getMovements:
    async (): Promise<CashMovement[]> => {
      const response =
        await api.get<CashMovement[]>(
          "/cash-movements"
        );

      return response.data;
    },

  getMovementsBySession: async (
    sessionId: number
  ): Promise<CashMovement[]> => {
    const response =
      await api.get<CashMovement[]>(
        `/cash-movements/session/${sessionId}`
      );

    return response.data;
  },
};