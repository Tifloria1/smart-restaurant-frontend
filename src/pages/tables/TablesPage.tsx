import { useEffect, useState } from "react";
import { Table2 } from "lucide-react";
import { tableApi } from "../../api/table.api";
import type { DiningTable } from "../../types/table";

export function TablesPage() {
  const [tables, setTables] = useState<DiningTable[]>([]);

  useEffect(() => {
    tableApi.getAll().then(setTables);
  }, []);

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Dining Tables</h2>
          <p>Monitor table availability and restaurant floor status.</p>
        </div>
        <button className="primary-button">Add Table</button>
      </div>

      <div className="table-grid">
        {tables.map((table) => (
          <div className="table-card" key={table.id}>
            <div className="table-card-icon">
              <Table2 />
            </div>

            <h3>Table {table.tableNumber}</h3>
            <p>{table.capacity} seats</p>

            <span className={`table-status ${table.status.toLowerCase()}`}>
              {table.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}