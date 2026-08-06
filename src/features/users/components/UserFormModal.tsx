import { useState } from "react";

import type {
  RoleName,
} from "../../../types/user";

import { BaseModal } from "../../../shared/components/BaseModal";

const roles: RoleName[] = [
  "ADMIN",
  "MANAGER",
  "CASHIER",
  "KITCHEN",
];

interface CreateUserData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RoleName;
}

interface UserFormModalProps {
  creating: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateUserData
  ) => Promise<boolean>;
}

export function UserFormModal({
  creating,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("123456");

  const [confirmPassword, setConfirmPassword] =
    useState("123456");

  const [role, setRole] =
    useState<RoleName>("CASHIER");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const created = await onSubmit({
      fullName,
      email,
      password,
      confirmPassword,
      role,
    });

    if (created) {
      onClose();
    }
  };

  return (
    <BaseModal
      title="Create User"
      description="Create a restaurant staff account and assign a role."
      onClose={onClose}
      size="medium"
      footer={
        <>
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={creating}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-user-form"
            className="primary-button"
            disabled={creating}
          >
            {creating
              ? "Creating..."
              : "Create User"}
          </button>
        </>
      }
    >
      <form
        id="create-user-form"
        className="users-form"
        onSubmit={handleSubmit}
      >
        <label>
          Full Name

          <input
            required
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
          />
        </label>

        <label>
          Email

          <input
            required
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </label>

        <label>
          Password

          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </label>

        <label>
          Confirm Password

          <input
            required
            type="password"
            minLength={6}
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />
        </label>

        <label>
          Role

          <select
            value={role}
            onChange={(event) =>
              setRole(
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
        </label>
      </form>
    </BaseModal>
  );
}