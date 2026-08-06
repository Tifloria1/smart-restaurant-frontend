import type { PermissionName } from "../types/auth";
import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: PermissionName) => {
    return user?.permissions?.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: PermissionName[]) => {
    return permissions.some((permission) => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
  };
}