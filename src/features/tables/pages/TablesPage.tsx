import { useState } from "react";
import { Table2 } from "lucide-react";

import "../styles/tables.css";

import { TableCard } from "../components/TableCard";
import { TableFormModal } from "../components/TableFormModal";
import { useTables } from "../hooks/useTables";

import { EmptyState } from "../../../shared/components/EmptyState";
import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function TablesPage() {
  const {
    tables,
    loading,
  } = useTables();

  const [modalOpen, setModalOpen] =
    useState(false);

  if (loading) {
    return (
      <PageLoader message="Loading dining tables..." />
    );
  }

  return (
    <div className="tables-page">
      <PageHeader
        title="Dining Tables"
        description="Monitor table availability and restaurant floor status."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() => setModalOpen(true)}
          >
            Add Table
          </button>
        }
      />

      {tables.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="No dining tables found"
            description="Dining tables will appear here after they are created."
            icon={<Table2 size={22} />}
            action={
              <button
                type="button"
                className="primary-button"
                onClick={() => setModalOpen(true)}
              >
                Add First Table
              </button>
            }
          />
        </div>
      ) : (
        <div className="dining-tables-grid">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <TableFormModal
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}