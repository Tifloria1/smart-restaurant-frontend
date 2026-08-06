import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import "../styles/dashboard.css";

import { DashboardStatsGrid } from "../components/DashboardStatsGrid";
import { LowStockList } from "../components/LowStockList";
import { RecentOrdersTable } from "../components/RecentOrdersTable";
import { RevenueChart } from "../components/RevenueChart";
import { TopProductsChart } from "../components/TopProductsChart";

import { useDashboard } from "../hooks/useDashboard";

import { EmptyState } from "../../../shared/components/EmptyState";
import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function DashboardPage() {
  const {
    stats,
    revenue,
    topProducts,
    recentOrders,
    lowStockProducts,

    loading,
    error,

    loadDashboard,
  } = useDashboard();

  if (loading) {
    return (
      <PageLoader message="Loading dashboard..." />
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <EmptyState
          title="Dashboard unavailable"
          description={error}
          icon={<AlertTriangle size={22} />}
          action={
            <button
              type="button"
              className="secondary-button"
              onClick={loadDashboard}
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          }
        />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Overview of restaurant activity and performance."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={loadDashboard}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <DashboardStatsGrid
        stats={stats}
      />

      <div className="dashboard-charts-grid">
        <RevenueChart
          revenue={revenue}
        />

        <TopProductsChart
          products={topProducts}
        />
      </div>

      <div className="dashboard-bottom-grid">
        <RecentOrdersTable
          orders={recentOrders}
        />

        <LowStockList
          products={lowStockProducts}
        />
      </div>
    </div>
  );
}