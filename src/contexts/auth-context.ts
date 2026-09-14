import { createContext } from "react";

import type {
  AuthResponse,
  LoginRequest,
  PermissionName,
} from "../types/auth";

export interface AuthContextType {
  user: AuthResponse | null;

  login: (
    data: LoginRequest
  ) => Promise<AuthResponse>;

  logout: () => void;

  isAuthenticated: boolean;

  hasPermission: (
    permission: PermissionName
  ) => boolean;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );