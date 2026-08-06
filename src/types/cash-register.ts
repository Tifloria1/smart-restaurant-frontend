export type CashRegisterSessionStatus =
  | "OPEN"
  | "CLOSED";

export type CashMovementType =
  | "CASH_IN"
  | "CASH_OUT";

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

export interface CashMovement {
  id: number;
  createdAt: string;

  type: CashMovementType;
  amount: number;
  reason: string;

  sessionId: number;

  createdById: number | null;
  createdByName: string | null;
}

export interface OpenCashRegisterRequest {
  openingBalance: number;
}

export interface CloseCashRegisterRequest {
  closingBalance: number;
}

export interface CreateCashMovementRequest {
  type: CashMovementType;
  amount: number;
  reason: string;
}