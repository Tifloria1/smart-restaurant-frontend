import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  ReportProduct,
} from "../../../types/report";

import { EmptyState } from "../../../shared/components/EmptyState";

interface TopProductsChartProps {
  products: ReportProduct[];
}

export function TopProductsChart({
  products,
}: TopProductsChartProps) {
  return (
    <section className="panel report-chart-card">
      <h3>Top Products</h3>

      {products.length === 0 ? (
        <EmptyState
          title="No product statistics"
          description="Top-selling products will appear here for the selected period."
        />
      ) : (
        <div className="report-chart-container">
          <ResponsiveContainer>
            <BarChart data={products}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="productName" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="quantitySold"
                fill="#0B2D5C"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}