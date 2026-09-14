import { api } from "./axios";
import type { Category } from "../types/product";

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
  active: boolean;
}

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response =
      await api.get<Category[]>("/categories");

    return response.data;
  },

  create: async (
    data: CreateCategoryRequest
  ): Promise<Category> => {
    const response =
      await api.post<Category>(
        "/categories",
        data
      );

    return response.data;
  },

  update: async (
    id: number,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    const response =
      await api.put<Category>(
        `/categories/${id}`,
        data
      );

    return response.data;
  },

  delete: async (
    id: number
  ): Promise<void> => {
    await api.delete(
      `/categories/${id}`
    );
  },
};