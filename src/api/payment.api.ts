import { api } from "./axios";
import type { CreatePaymentRequest, Payment } from "../types/payment";

export const paymentApi = {
  payOrder: async (
    orderId: number,
    request: CreatePaymentRequest
  ): Promise<Payment> => {
    const response = await api.post<Payment>(
      `/payments/orders/${orderId}`,
      request
    );
    return response.data;
  },

  downloadInvoicePdf: async (orderId: number): Promise<Blob> => {
  const response = await api.get(`/payments/orders/${orderId}/invoice/pdf`, {
    responseType: "blob",
  });

  return response.data;
},
};