import { useState, type ReactNode } from "react";
import type { AuthResponse, LoginRequest } from "../types/auth";
import { authApi } from "../api/auth.api";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);

    localStorage.setItem("accessToken", response.token);
    localStorage.setItem("user", JSON.stringify(response));

    setUser(response);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}