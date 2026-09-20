import {
  AlertTriangle,
  CalendarDays,
  Package,
  Receipt,
  ShoppingCart,
  Table2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import type {
  ElementType,
} from "react";

import type {
  DashboardStats,
} from "../../../types/dashboard";

interface DashboardStatsGridProps {
  stats: DashboardStats;
}

interface DashboardCard {
  title: string;
  value: string | number;
  icon: ElementType;
}

export function DashboardStatsGrid({
  stats,
}: DashboardStatsGridProps) {
  const cards: DashboardCard[] = [
    {
      title: "Today Revenue",
      value: `${Number(
        stats.todayRevenue ?? 0
      ).toFixed(2)} MAD`,
      icon: TrendingUp,
    },
    {
      title: "Monthly Revenue",
      value: `${Number(
        stats.monthlyRevenue ?? 0
      ).toFixed(2)} MAD`,
      icon: Wallet,
    },
    {
      title: "Paid Orders",
      value: stats.totalOrders ?? 0,
      icon: ShoppingCart,
    },
    {
      title: "Average Order",
      value: `${Number(
        stats.averageOrderValue ?? 0
      ).toFixed(2)} MAD`,
      icon: Receipt,
    },
    {
      title: "Products",
      value: stats.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Customers",
      value: stats.totalCustomers ?? 0,
      icon: Users,
    },
    {
      title: "Open Tables",
      value: stats.openTables ?? 0,
      icon: Table2,
    },
    {
      title: "Today's Reservations",
      value: stats.todayReservations ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Low Stock",
      value: stats.lowStockProducts ?? 0,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="dashboard-stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            className="dashboard-stat-card"
            key={card.title}
          >
            <div className="dashboard-stat-card__icon">
              <Icon size={22} />
            </div>

            <div>
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}