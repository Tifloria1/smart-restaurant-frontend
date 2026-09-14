import { api } from "./axios";
import type { AppUser, CreateUserRequest, UpdateUserRoleRequest } from "../types/user";

export const userApi = {
  getAll: async (): Promise<AppUser[]> => {
    const response = await api.get<AppUser[]>("/users");
    return response.data;
  },

  create: async (request: CreateUserRequest): Promise<AppUser> => {
    const response = await api.post<AppUser>("/users", request);
    return response.data;
  },

  updateRole: async (id: number, request: UpdateUserRoleRequest): Promise<AppUser> => {
    const response = await api.patch<AppUser>(`/users/${id}/role`, request);
    return response.data;
  },

  activate: async (id: number): Promise<void> => {
    await api.patch(`/users/${id}/activate`);
  },

  deactivate: async (id: number): Promise<void> => {
    await api.patch(`/users/${id}/deactivate`);
  },

  delete: async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
},
};