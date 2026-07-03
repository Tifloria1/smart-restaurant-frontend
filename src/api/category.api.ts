import { api } from "./axios";
import type { Category } from "../types/product";

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },
};