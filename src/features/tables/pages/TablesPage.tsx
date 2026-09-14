import { useState } from "react";
import { Table2 } from "lucide-react";
import { toast } from "sonner";

import "../styles/tables.css";

import { TableCard } from "../components/TableCard";
import { TableFormModal } from "../components/TableFormModal";
import { useTables } from "../hooks/useTables";

import { tableApi } from "../../../api/table.api";

import type {
  DiningTable,
} from "../../../types/table";

import { EmptyState } from "../../../shared/components/EmptyState";
import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function TablesPage() {
  const {
    tables,
    loading,
    loadTables,
  } = useTables();

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [editingTable, setEditingTable] =
    useState<DiningTable | null>(null);

  const handleDelete = async (
    table: DiningTable
  ) => {
    if (table.status === "OCCUPIED") {
      toast.error(
        "An occupied table cannot be deleted."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete table "${table.tableNumber}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await tableApi.delete(table.id);

      toast.success(
        "Table deleted successfully"
      );

      await loadTables();
    } catch (error) {
      console.error(
        "Failed to delete dining table",
        error
      );

      toast.error(
        "This table cannot be deleted because it may be linked to existing restaurant records."
      );
    }
  };

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
            onClick={() =>
              setCreateModalOpen(true)
            }
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
                onClick={() =>
                  setCreateModalOpen(true)
                }
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
              onEdit={setEditingTable}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {createModalOpen && (
        <TableFormModal
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSuccess={loadTables}
        />
      )}

      {editingTable && (
        <TableFormModal
          table={editingTable}
          onClose={() =>
            setEditingTable(null)
          }
          onSuccess={loadTables}
        />
      )}
    </div>
  );
}