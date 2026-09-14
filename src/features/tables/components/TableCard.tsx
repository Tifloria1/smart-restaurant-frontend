import {
  Pencil,
  Table2,
  Trash2,
  Users,
} from "lucide-react";

import { StatusBadge } from "../../../shared/components/StatusBadge";

import type {
  DiningTable,
} from "../../../types/table";

interface TableCardProps {
  table: DiningTable;
  onEdit: (table: DiningTable) => void;
  onDelete: (table: DiningTable) => void;
}

export function TableCard({
  table,
  onEdit,
  onDelete,
}: TableCardProps) {
  const getStatusVariant = () => {
    switch (table.status) {
      case "FREE":
        return "success";

      case "RESERVED":
        return "info";

      case "OCCUPIED":
      default:
        return "warning";
    }
  };

  const getStatusLabel = () => {
    switch (table.status) {
      case "FREE":
        return "Free";

      case "RESERVED":
        return "Reserved";

      case "OCCUPIED":
      default:
        return "Occupied";
    }
  };

  return (
    <div className="dining-table-card">
      <div className="dining-table-card__top">
        <div className="dining-table-card__icon">
          <Table2 size={22} />
        </div>

        <div className="dining-table-card__actions">
          <button
            type="button"
            className="table-action-button"
            title="Edit table"
            aria-label={`Edit ${table.tableNumber}`}
            onClick={() => onEdit(table)}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="table-action-button table-action-button--delete"
            title="Delete table"
            aria-label={`Delete ${table.tableNumber}`}
            onClick={() => onDelete(table)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="dining-table-card__content">
        <h3>{table.tableNumber}</h3>

        <p>
          <Users size={15} />
          <span>
            {table.capacity} seats
          </span>
        </p>
      </div>

      <StatusBadge
        variant={getStatusVariant()}
      >
        {getStatusLabel()}
      </StatusBadge>
    </div>
  );
}