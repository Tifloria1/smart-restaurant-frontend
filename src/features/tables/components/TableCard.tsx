import { Table2, Users } from "lucide-react";

interface TableCardProps {
  table: {
    id: number;
    tableNumber: string;
    capacity: number;
    status: string;
  };
}

export function TableCard({ table }: TableCardProps) {
  return (
    <div className="table-card">
      <div className="table-card__icon">
        <Table2 size={22} />
      </div>

      <h3>{table.tableNumber}</h3>

      <div className="table-card__capacity">
        <Users size={16} />
        <span>{table.capacity} seats</span>
      </div>

      <span
        className={`status-badge ${
          table.status === "FREE"
            ? "status-success"
            : "status-warning"
        }`}
      >
        {table.status}
      </span>
    </div>
  );
}