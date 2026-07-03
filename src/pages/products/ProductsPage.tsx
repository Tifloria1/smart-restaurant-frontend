import { useEffect, useState } from "react";
import { Edit, Package, Trash2 } from "lucide-react";

import { productApi } from "../../api/product.api";
import type {
  CreateProductRequest,
  UpdateProductRequest,
  Product,
} from "../../types/product";

import { ProductFormModal } from "./ProductFormModal";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdate = async (data: CreateProductRequest) => {
    try {
      if (selectedProduct) {
        const request: UpdateProductRequest = {
          ...data,
        };

        await productApi.update(selectedProduct.id, request);
      } else {
        await productApi.create(data);
      }

      setModalOpen(false);
      setSelectedProduct(null);

      await refreshProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Delete product "${product.name}" ?`
    );

    if (!confirmed) return;

    try {
      await productApi.delete(product.id);
      await refreshProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Products</h2>
          <p>
            Manage menu items, prices, stock and preparation destination.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setSelectedProduct(null);
            setModalOpen(true);
          }}
        >
          Add Product
        </button>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Destination</th>
              <th>Status</th>
            <th style={{ width: 120 }}>Actions</th> 
                       </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="table-main-cell">
                    <div className="mini-icon">
                      <Package size={18} />
                    </div>

                    <div>
                      <strong>{product.name}</strong>

                      <p>{product.description}</p>
                    </div>
                  </div>
                </td>

                <td>{product.categoryName}</td>

                <td>{product.price} MAD</td>

                <td>{product.stockQuantity}</td>

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
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="icon-action"
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      className="icon-action danger"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="muted">No products found.</p>
        )}
      </div>

      {modalOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleCreateOrUpdate}
        />
      )}
    </div>
  );
}