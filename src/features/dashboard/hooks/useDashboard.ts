import { useEffect, useState } from "react";
import { toast } from "sonner";

import { dashboardApi } from "../../../api/dashboard.api";

import type {
  DailyRevenue,
  DashboardStats,
  RecentOrder,
  TopProduct,
} from "../../../types/dashboard";

import type {
  Product,
} from "../../../types/product";

export function useDashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [revenue, setRevenue] =
    useState<DailyRevenue[]>([]);

  const [topProducts, setTopProducts] =
    useState<TopProduct[]>([]);

  const [recentOrders, setRecentOrders] =
    useState<RecentOrder[]>([]);

  const [
    lowStockProducts,
    setLowStockProducts,
  ] = useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        statsData,
        revenueData,
        topProductsData,
        recentOrdersData,
        lowStockData,
      ] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRevenueLast7Days(),
        dashboardApi.getTopProducts(),
        dashboardApi.getRecentOrders(),
        dashboardApi.getLowStockProducts(),
      ]);

      setStats(statsData);

      setRevenue(
        Array.isArray(revenueData)
          ? revenueData
          : []
      );

      setTopProducts(
        Array.isArray(topProductsData)
          ? topProductsData
          : []
      );

      setRecentOrders(
        Array.isArray(recentOrdersData)
          ? recentOrdersData
          : []
      );

      setLowStockProducts(
        Array.isArray(lowStockData)
          ? lowStockData
          : []
      );
    } catch (loadError) {
      console.error(
        "Failed to load dashboard",
        loadError
      );

      setError(
        "Failed to load dashboard data"
      );

      toast.error(
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    revenue,
    topProducts,
    recentOrders,
    lowStockProducts,

    loading,
    error,

    loadDashboard,
  };
}