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
  DailyRevenueReport,
} from "../../../types/report";

import { EmptyState } from "../../../shared/components/EmptyState";

interface RevenueChartProps {
  data: DailyRevenueReport[];
}

export function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <section className="panel report-chart-card">
      <h3>Revenue Evolution</h3>

      {data.length === 0 ? (
        <EmptyState
          title="No revenue data"
          description="Revenue information will appear here for the selected period."
        />
      ) : (
        <div className="report-chart-container">
          <ResponsiveContainer>
            <LineChart data={data}>
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