import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import type { RoleName } from "../types/user";

interface RoleRouteProps {
  allowedRoles: RoleName[];
  children: ReactNode;
}

export function RoleRoute({
  allowedRoles,
  children,
}: RoleRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role as RoleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return
   <>{children}</>;
}