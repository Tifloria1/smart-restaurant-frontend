import { api } from "./axios";
import type { Customer } from "../types/customer";

export interface CreateCustomerRequest {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateCustomerRequest {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
}

export const customerApi = {
  getAll: async (): Promise<Customer[]> => {
    const response =
      await api.get<Customer[]>("/customers");

    return response.data;
  },

  create: async (
    customer: CreateCustomerRequest
  ): Promise<Customer> => {
    const response =
      await api.post<Customer>(
        "/customers",
        customer
      );

    return response.data;
  },

  update: async (
    id: number,
    customer: UpdateCustomerRequest
  ): Promise<Customer> => {
    const response =
      await api.put<Customer>(
        `/customers/${id}`,
        customer
      );

    return response.data;
  },

  delete: async (
    id: number
  ): Promise<void> => {
    await api.delete(`/customers/${id}`);
  },
};