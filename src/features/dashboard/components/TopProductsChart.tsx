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
  TopProduct,
} from "../../../types/dashboard";

import { EmptyState } from "../../../shared/components/EmptyState";

interface TopProductsChartProps {
  products: TopProduct[];
}

export function TopProductsChart({
  products,
}: TopProductsChartProps) {
  return (
    <section className="panel dashboard-chart-card">
      <h3>Top Products</h3>

      {products.length === 0 ? (
        <EmptyState
          title="No product statistics"
          description="Top-selling products will appear here."
        />
      ) : (
        <div className="dashboard-chart-container">
          <ResponsiveContainer>
            <BarChart data={products}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="productName"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="totalQuantitySold"
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