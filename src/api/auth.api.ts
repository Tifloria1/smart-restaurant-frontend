import { api } from "./axios";
import type { AuthResponse, LoginRequest } from "../types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },
};