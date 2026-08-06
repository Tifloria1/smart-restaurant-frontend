import { RefreshCw } from "lucide-react";

import "../styles/audit-logs.css";

import { AuditLogsTable } from "../components/AuditLogsTable";
import { AuditSearchBar } from "../components/AuditSearchBar";

import { useAuditLogs } from "../hooks/useAuditLogs";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function AuditLogsPage() {
  const {
    filteredLogs,
    search,
    setSearch,
    loading,
    loadLogs,
  } = useAuditLogs();

  if (loading) {
    return (
      <PageLoader message="Loading audit logs..." />
    );
  }

  return (
    <div className="audit-page">
      <PageHeader
        title="Audit Logs"
        description="Track actions performed in the system."
        actions={
          <button
            className="secondary-button"
            onClick={loadLogs}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <div className="panel">
        <AuditSearchBar
          value={search}
          onChange={setSearch}
        />

        <AuditLogsTable
          logs={filteredLogs}
        />
      </div>
    </div>
  );
}