export type RoleName = "ADMIN" | "MANAGER" | "CASHIER" | "KITCHEN";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: RoleName;
}