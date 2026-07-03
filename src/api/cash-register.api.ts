import { api } from "./axios";
import type {
  CashRegisterSession,
  CloseCashRegisterRequest,
  OpenCashRegisterRequest,
} from "../types/cash-register";

export const cashRegisterApi = {
  getCurrent: async (): Promise<CashRegisterSession> => {
    const response = await api.get<CashRegisterSession>(
      "/cash-register-sessions/current"
    );
    return response.data;
  },

  open: async (
    request: OpenCashRegisterRequest
  ): Promise<CashRegisterSession> => {
    const response = await api.post<CashRegisterSession>(
      "/cash-register-sessions/open",
      request
    );
    return response.data;
  },

  close: async (
    request: CloseCashRegisterRequest
  ): Promise<CashRegisterSession> => {
    const response = await api.post<CashRegisterSession>(
      "/cash-register-sessions/close",
      request
    );
    return response.data;
  },
};