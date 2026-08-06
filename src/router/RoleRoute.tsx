import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { RoleName } from "../types/auth";

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: RoleName[];
}

export function RoleRoute({ children, allowedRoles }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}