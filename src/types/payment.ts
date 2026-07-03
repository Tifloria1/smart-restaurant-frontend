export type PaymentMethod = "CASH" | "CARD";

export interface CreatePaymentRequest {
  method: PaymentMethod;
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: "PAID" | "CANCELLED";
  paidAt: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  orderId: number;
  paymentId: number;
  totalAmount: number;
  issuedAt: string;
}