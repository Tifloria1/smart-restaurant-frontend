import { api } from "./axios";

import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "../types/product";

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (
    request: CreateProductRequest
  ): Promise<Product> => {
    const response = await api.post<Product>(
      "/products",
      request
    );

    return response.data;
  },

  update: async (
    id: number,
    request: UpdateProductRequest
  ): Promise<Product> =>{
    const response = await api.put<Product>(
      `/products/${id}`,
      request
    );

    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getLowStock: async (
    threshold = 10
  ): Promise<Product[]> => {
    const response = await api.get<Product[]>(
      `/products/low-stock?threshold=${threshold}`
    );

    return response.data;
  },
};