import { api } from "./axios";
import type {
  DiningTable,
  TableStatus,
} from "../types/table";

export interface CreateDiningTableRequest {
  tableNumber: string;
  capacity: number;
}

export interface UpdateDiningTableRequest {
  tableNumber: string;
  capacity: number;
  status: TableStatus;
}

export const tableApi = {
  getAll: async (): Promise<DiningTable[]> => {
    const response =
      await api.get<DiningTable[]>("/dining-tables");

    return response.data;
  },

  create: async (
    data: CreateDiningTableRequest
  ): Promise<DiningTable> => {
    const response =
      await api.post<DiningTable>(
        "/dining-tables",
        data
      );

    return response.data;
  },

  update: async (
    id: number,
    data: UpdateDiningTableRequest
  ): Promise<DiningTable> => {
    const response =
      await api.put<DiningTable>(
        `/dining-tables/${id}`,
        data
      );

    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/dining-tables/${id}`);
  },
};