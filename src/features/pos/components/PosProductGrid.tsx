import { PackageSearch } from "lucide-react";

import type { Product } from "../../../types/product";

import { EmptyState } from "../../../shared/components/EmptyState";

interface PosProductGridProps {
  products: Product[];

  onAddProduct: (
    product: Product
  ) => void;
}

export function PosProductGrid({
  products,
  onAddProduct,
}: PosProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No active products found"
        description="Active products will appear here and can be added to the current order."
        icon={<PackageSearch size={22} />}
      />
    );
  }

  return (
    <div className="pos-product-grid">
      {products.map((product) => {
        const outOfStock =
          product.stockQuantity <= 0;

        return (
          <button
            key={product.id}
            type="button"
            className="pos-product-card"
            disabled={outOfStock}
            onClick={() =>
              onAddProduct(product)
            }
          >
            <div className="pos-product-card__header">
              <strong>
                {product.name}
              </strong>

              <span
                className={
                  outOfStock
                    ? "pos-stock pos-stock--empty"
                    : product.stockQuantity <=
                        product.stockAlertThreshold
                      ? "pos-stock pos-stock--low"
                      : "pos-stock"
                }
              >
                {outOfStock
                  ? "Out of stock"
                  : `${product.stockQuantity} in stock`}
              </span>
            </div>

            <p>
              {product.categoryName || "Uncategorized"}
            </p>

            <div className="pos-product-card__footer">
              <b>
                {Number(
                  product.price
                ).toFixed(2)}{" "}
                MAD
              </b>

              <span>
                Add to order
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}