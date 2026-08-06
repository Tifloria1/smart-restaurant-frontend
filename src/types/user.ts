export type RoleName = "ADMIN" | "MANAGER" | "CASHIER" | "KITCHEN";

export interface AppUser {
  id: number;
  fullName: string;
  email: string;
  role: RoleName;
  active: boolean;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RoleName;
}

export interface UpdateUserRoleRequest {
  role: RoleName;
}