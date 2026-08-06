import { api } from "./axios";
import type { DashboardStats, TopProduct } from "../types/dashboard";
import type { Product } from "../types/product";
import type { DailyRevenue, RecentOrder } from "../types/dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  getTopProducts: async (): Promise<TopProduct[]> => {
    const response = await api.get<TopProduct[]>("/dashboard/top-products");
    return response.data;
  },

  getRevenueLast7Days: async (): Promise<DailyRevenue[]> => {
  const response = await api.get<DailyRevenue[]>("/dashboard/revenue-last-7-days");
  return response.data;
},

getRecentOrders: async (): Promise<RecentOrder[]> => {
  const response = await api.get<RecentOrder[]>("/dashboard/recent-orders");
  return response.data;
},

getLowStockProducts: async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/dashboard/low-stock-products");
  return response.data;
},
};