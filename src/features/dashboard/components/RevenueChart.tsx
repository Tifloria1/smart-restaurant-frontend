import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  DailyRevenue,
} from "../../../types/dashboard";

import { EmptyState } from "../../../shared/components/EmptyState";

interface RevenueChartProps {
  revenue: DailyRevenue[];
}

export function RevenueChart({
  revenue,
}: RevenueChartProps) {
  return (
    <section className="panel dashboard-chart-card">
      <h3>Revenue Last 7 Days</h3>

      {revenue.length === 0 ? (
        <EmptyState
          title="No revenue data"
          description="Revenue information will appear here when paid orders are available."
        />
      ) : (
        <div className="dashboard-chart-container">
          <ResponsiveContainer>
            <LineChart data={revenue}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0B2D5C"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}