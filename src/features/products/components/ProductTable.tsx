import {
  Edit,
  Package,
  Trash2,
} from "lucide-react";

import type {
  Product,
} from "../../../types/product";

interface Props {
  products: Product[];

  onEdit: (
    product: Product
  ) => void;

  onDelete: (
    productId: number
  ) => void;
}

const API_ORIGIN = "http://localhost:8083";

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        No products found.
      </div>
    );
  }

  return (
    <div className="products-table-wrapper">
      <table className="data-table products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Destination</th>
            <th>Status</th>

            <th
              style={{
                width: 120,
              }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const imageSrc =
              product.imageUrl
                ? `${API_ORIGIN}${product.imageUrl}`
                : null;

            return (
              <tr key={product.id}>
                <td>
                  <div className="table-main-cell">

                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.name}
                        style={{
                          width: "52px",
                          height: "52px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          flexShrink: 0,
                          border:
                            "1px solid #e5e7eb",
                        }}
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="mini-icon">
                        <Package size={18} />
                      </div>
                    )}

                    <div>
                      <strong>
                        {product.name}
                      </strong>

                      <p>
                        {product.description ||
                          "No description"}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  {product.categoryName}
                </td>

                <td>
                  {Number(
                    product.price
                  ).toFixed(2)}{" "}
                  MAD
                </td>

                <td>
                  <span
                    className={
                      product.stockQuantity <=
                      product.stockAlertThreshold
                        ? "status danger"
                        : "badge"
                    }
                  >
                    {product.stockQuantity}
                  </span>
                </td>

                <td>
                  <span className="badge">
                    {product.destination}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      product.active
                        ? "status success"
                        : "status danger"
                    }
                  >
                    {product.active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="icon-action"
                      onClick={() =>
                        onEdit(product)
                      }
                      title="Edit product"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      type="button"
                      className="icon-action danger"
                      onClick={() =>
                        onDelete(product.id)
                      }
                      title="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}