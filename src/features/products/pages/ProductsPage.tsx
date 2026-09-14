import "../styles/products.css";
import { ProductTable } from "../components/ProductTable";
import { ProductFormModal } from "../components/ProductFormModal";

import { useProducts } from "../hooks/useProducts";




export function ProductsPage() {
  const {
    products,
    loading,

    modalOpen,
    selectedProduct,

    openCreateModal,
    openEditModal,
    closeModal,

    saveProduct,
    deleteProduct,
  } = useProducts();

  if (loading) {
    return (
      <div className="page-loading">
        Loading products...
      </div>
    );
  }

  return (
     <div className="products-page">
      <div className="page-header row-between">
        <div>
          <h2>Products</h2>

          <p>
            Manage menu items,
            prices, stock and
            preparation destination.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={
            openCreateModal
          }
        >
          Add Product
        </button>
      </div>

      <div className="panel">
        <ProductTable
          products={products}
          onEdit={
            openEditModal
          }
          onDelete={
            deleteProduct
          }
        />
      </div>

      {modalOpen && (
        <ProductFormModal
          product={
            selectedProduct
          }
          onClose={
            closeModal
          }
          onSubmit={
            saveProduct
          }
        />
      )}
    </div>
  );
}