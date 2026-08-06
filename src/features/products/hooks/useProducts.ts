import { useEffect, useState } from "react";
import { toast } from "sonner";

import { productApi } from "../../../api/product.api";

import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "../../../types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data =
        await productApi.getAll();

      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const saveProduct = async (
    data: CreateProductRequest
  ) => {
    try {
      if (selectedProduct) {
        await productApi.update(
          selectedProduct.id,
          data as UpdateProductRequest
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await productApi.create(data);

        toast.success(
          "Product created successfully"
        );
      }

      closeModal();

      await loadProducts();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to save product"
      );
    }
  };

  const deleteProduct = async (
    productId: number
  ) => {
    try {
      await productApi.delete(
        productId
      );

      toast.success(
        "Product deleted successfully"
      );

      await loadProducts();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete product"
      );
    }
  };

  return {
    products,
    loading,

    modalOpen,
    selectedProduct,

    loadProducts,

    openCreateModal,
    openEditModal,
    closeModal,

    saveProduct,
    deleteProduct,
  };
}