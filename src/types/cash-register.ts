export type CashRegisterSessionStatus = "OPEN" | "CLOSED";

export interface CashRegisterSession {
  id: number;
  openedAt: string;
  closedAt: string | null;
  openingBalance: number;
  closingBalance: number | null;
  expectedBalance: number | null;
  differenceAmount: number | null;
  status: CashRegisterSessionStatus;
  openedById: number;
  openedByName: string;
  closedById: number | null;
  closedByName: string | null;
}

export interface OpenCashRegisterRequest {
  openingBalance: number;
}

export interface CloseCashRegisterRequest {
  closingBalance: number;
}