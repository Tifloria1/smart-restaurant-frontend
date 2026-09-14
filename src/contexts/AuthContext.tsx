import {
  useState,
  type ReactNode,
} from "react";

import type {
  AuthResponse,
  LoginRequest,
  PermissionName,
} from "../types/auth";

import { authApi } from "../api/auth.api";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthResponse | null>(() => {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  const login = async (
    data: LoginRequest
  ): Promise<AuthResponse> => {
    const response =
      await authApi.login(data);

    localStorage.setItem(
      "accessToken",
      response.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response)
    );

    setUser(response);

    return response;
  };

  const logout = () => {
    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem("user");

    setUser(null);
  };

  const hasPermission = (
    permission: PermissionName
  ): boolean => {
    if (!user) {
      return false;
    }

    return (
      Array.isArray(user.permissions) &&
      user.permissions.includes(permission)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}