import { useEffect, useState } from "react";
import { toast } from "sonner";

import { userApi } from "../../../api/user.api";

import type {
  AppUser,
  RoleName,
} from "../../../types/user";

interface CreateUserData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RoleName;
}

export function useUsers() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [updatingUserId, setUpdatingUserId] =
    useState<number | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await userApi.getAll();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (
    data: CreateUserData
  ): Promise<boolean> => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    try {
      setCreating(true);

      await userApi.create(data);

      toast.success("User created successfully");

      await loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user", error);

      toast.error("Failed to create user");

      return false;
    } finally {
      setCreating(false);
    }
  };

  const changeRole = async (
    userId: number,
    role: RoleName
  ) => {
    try {
      setUpdatingUserId(userId);

      await userApi.updateRole(userId, {
        role,
      });

      toast.success("User role updated");

      await loadUsers();
    } catch (error) {
      console.error(
        "Failed to update user role",
        error
      );

      toast.error("Failed to update user role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const toggleActive = async (
    user: AppUser
  ) => {
    try {
      setUpdatingUserId(user.id);

      if (user.active) {
        await userApi.deactivate(user.id);

        toast.success("User deactivated");
      } else {
        await userApi.activate(user.id);

        toast.success("User activated");
      }

      await loadUsers();
    } catch (error) {
      console.error(
        "Failed to update user status",
        error
      );

      toast.error("Failed to update user status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return {
    users,
    loading,
    creating,
    updatingUserId,

    loadUsers,
    createUser,
    changeRole,
    toggleActive,
  };
}