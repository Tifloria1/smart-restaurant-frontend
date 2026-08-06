import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { PermissionName } from "../types/auth";

interface PermissionRouteProps {
  children: React.ReactNode;
  permissions: PermissionName[];
}

export function PermissionRoute({ children, permissions }: PermissionRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = permissions.some((permission) =>
    user?.permissions?.includes(permission)
  );

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}