import {
  AlertTriangle,
  PackageCheck,
} from "lucide-react";

import type {
  Product,
} from "../../../types/product";

import { EmptyState } from "../../../shared/components/EmptyState";

interface LowStockListProps {
  products: Product[];
}

export function LowStockList({
  products,
}: LowStockListProps) {
  if (products.length === 0) {
    return (
      <section className="panel">
        <EmptyState
          title="No low-stock products"
          description="All products currently have sufficient stock."
          icon={<PackageCheck size={22} />}
        />
      </section>
    );
  }

  return (
    <section className="panel dashboard-low-stock">
      <h3>Low Stock Alerts</h3>

      <div className="dashboard-low-stock-list">
        {products.map((product) => (
          <article
            className="dashboard-low-stock-item"
            key={product.id}
          >
            <div className="dashboard-low-stock-item__icon">
              <AlertTriangle size={18} />
            </div>

            <div className="dashboard-low-stock-item__content">
              <strong>
                {product.name}
              </strong>

              <p>
                Alert threshold:{" "}
                {
                  product.stockAlertThreshold
                }
              </p>
            </div>

            <span>
              {product.stockQuantity} remaining
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}