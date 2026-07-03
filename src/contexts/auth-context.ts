import { createContext } from "react";
import type { AuthResponse, LoginRequest } from "../types/auth";

export interface AuthContextType {
  user: AuthResponse | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);