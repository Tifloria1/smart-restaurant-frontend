import { api } from "./axios";

import type {
  CreateOrderRequest,
  Order,
} from "../types/order";

export const orderApi = {
  // =========================================================
  // CREATE NEW ORDER
  // =========================================================

  create: async (
    request: CreateOrderRequest
  ): Promise<Order> => {
    const response = await api.post<Order>(
      "/orders",
      request
    );

    return response.data;
  },

  // =========================================================
  // GET ALL ORDERS
  // =========================================================

  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>(
      "/orders"
    );

    return response.data;
  },

  // =========================================================
  // GET ORDER BY ID
  // =========================================================

  getById: async (
    id: number
  ): Promise<Order> => {
    const response = await api.get<Order>(
      `/orders/${id}`
    );

    return response.data;
  },

  // =========================================================
  // GET ACTIVE ORDER FOR TABLE
  // =========================================================

  getActiveByTable: async (
    tableId: number
  ): Promise<Order> => {
    const response = await api.get<Order>(
      `/orders/table/${tableId}/active`
    );

    return response.data;
  },

  // =========================================================
  // ADD ITEMS TO EXISTING ORDER
  // =========================================================

  addItems: async (
    orderId: number,
    request: CreateOrderRequest
  ): Promise<Order> => {
    const response = await api.post<Order>(
      `/orders/${orderId}/items`,
      request
    );

    return response.data;
  },

  transferTable: async (
  orderId: number,
  targetTableId: number
): Promise<Order> => {
  const response = await api.patch<Order>(
    `/orders/${orderId}/transfer/${targetTableId}`
  );

  return response.data;
},

  // =========================================================
  // CANCEL ORDER
  // =========================================================

  cancel: async (
    id: number
  ): Promise<Order> => {
    const response = await api.patch<Order>(
      `/orders/${id}/cancel`
    );

    return response.data;
  },
};