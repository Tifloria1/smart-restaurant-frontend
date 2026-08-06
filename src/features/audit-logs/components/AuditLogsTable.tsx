import { Shield } from "lucide-react";

import type { AuditLog } from "../../../types/audit-log";

import { EmptyState } from "../../../shared/components/EmptyState";

interface Props {
  logs: AuditLog[];
}

export function AuditLogsTable({
  logs,
}: Props) {
  if (!logs.length) {
    return (
      <EmptyState
        title="No audit logs"
        description="System actions will appear here."
        icon={<Shield size={22} />}
      />
    );
  }

  return (
    <div className="audit-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Action</th>
            <th>Description</th>
            <th>Entity</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </td>

              <td>
                {log.userName || "-"}
              </td>

              <td>
                <span className="badge">
                  {log.action}
                </span>
              </td>

              <td>
                {log.description}
              </td>

              <td>
                {log.entityName} #
                {log.entityId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}