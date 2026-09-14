import { Shield } from "lucide-react";

import type { AuditLog } from "../../../types/audit-log";

import { EmptyState } from "../../../shared/components/EmptyState";

interface Props {
  logs: AuditLog[];
}

function getActionBadgeClass(action: string) {
  switch (action) {
    case "CASH_IN":
      return "badge--cash-in";

    case "CASH_OUT":
      return "badge--cash-out";

    case "PAYMENT_CREATED":
      return "badge--payment";

    case "CREATE_ORDER":
      return "badge--order";

    case "OPEN_CASH_REGISTER":
      return "badge--open-register";

    case "CLOSE_CASH_REGISTER":
      return "badge--close-register";

    case "CANCEL_ORDER":
      return "badge--danger";

    default:
      return "badge--default";
  }
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
                <span
  className={`badge ${getActionBadgeClass(log.action)}`}
>
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