import { useState } from "react";

import "../styles/users.css";

import { UserFormModal } from "../components/UserFormModal";
import { UserTable } from "../components/UserTable";

import { useUsers } from "../hooks/useUsers";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function UsersPage() {
  const {
    users,
    loading,
    creating,
    updatingUserId,

    createUser,
    changeRole,
    toggleActive,
    deleteUser,
  } = useUsers();

  const [modalOpen, setModalOpen] =
    useState(false);

  if (loading) {
    return (
      <PageLoader message="Loading users..." />
    );
  }

  return (
    <div className="users-page">
      <PageHeader
        title="User Management"
        description="Create restaurant staff accounts and manage roles."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() => setModalOpen(true)}
          >
            Create User
          </button>
        }
      />

      <div className="panel">
        <UserTable
          users={users}
          updatingUserId={updatingUserId}
          onChangeRole={changeRole}
          onToggleActive={toggleActive}
          onDelete={deleteUser}
        />
      </div>

      {modalOpen && (
        <UserFormModal
          creating={creating}
          onSubmit={createUser}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}