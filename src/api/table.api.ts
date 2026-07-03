import { api } from "./axios";
import type { DiningTable } from "../types/table";

export const tableApi = {
  getAll: async (): Promise<DiningTable[]> => {
    const response = await api.get<DiningTable[]>("/dining-tables");
    return response.data;
  },
};