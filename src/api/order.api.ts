import { api } from "./axios";
import type { CreateOrderRequest, Order } from "../types/order";

export const orderApi = {
  create: async (request: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>("/orders", request);
    return response.data;
  },

  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  },
};