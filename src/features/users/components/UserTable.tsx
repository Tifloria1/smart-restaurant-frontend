import { UserRound } from "lucide-react";

import type {
  AppUser,
  RoleName,
} from "../../../types/user";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

const roles: RoleName[] = [
  "ADMIN",
  "MANAGER",
  "CASHIER",
  "KITCHEN",
];

interface UserTableProps {
  users: AppUser[];
  updatingUserId: number | null;
  

  onChangeRole: (
    userId: number,
    role: RoleName
  ) => Promise<void>;

  onToggleActive: (
    user: AppUser
  ) => Promise<void>;

  onDelete: (userId: number) => Promise<void>;
}

export function UserTable({
  users,
  updatingUserId,
  onChangeRole,
  onToggleActive,
  onDelete,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        description="Staff accounts will appear here after they are created."
        icon={<UserRound size={22} />}
      />
    );
  }

  return (
    <div className="users-table-wrapper">
      <table className="data-table users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isUpdating =
              updatingUserId === user.id;

            return (
              <tr key={user.id}>
                <td>
                  <div className="users-main-cell">
                    <div className="users-avatar">
                      <UserRound size={18} />
                    </div>

                    <strong>
                      {user.fullName}
                    </strong>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  <select
                    className="users-role-select"
                    value={user.role}
                    disabled={isUpdating}
                    onChange={(event) =>
                      onChangeRole(
                        user.id,
                        event.target.value as RoleName
                      )
                    }
                  >
                    {roles.map((roleName) => (
                      <option
                        key={roleName}
                        value={roleName}
                      >
                        {roleName}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <StatusBadge
                    variant={
                      user.active
                        ? "success"
                        : "danger"
                    }
                  >
                    {user.active
                      ? "Active"
                      : "Inactive"}
                  </StatusBadge>
                </td>

<td>
  <div className="users-actions">
    <button
      type="button"
      className="secondary-button"
      disabled={isUpdating}
      onClick={() => onToggleActive(user)}
    >
      {isUpdating
        ? "Updating..."
        : user.active
          ? "Deactivate"
          : "Activate"}
    </button>

    <button
      type="button"
      className="danger-button"
      disabled={isUpdating}
      onClick={() => onDelete(user.id)}
    >
      Delete
    </button>
  </div>
</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}