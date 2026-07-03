import { api } from "./axios";
import type { DashboardStats, TopProduct } from "../types/dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  getTopProducts: async (): Promise<TopProduct[]> => {
    const response = await api.get<TopProduct[]>("/dashboard/top-products");
    return response.data;
  },
};