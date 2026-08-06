import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { auditLogApi } from "../../../api/audit-log.api";
import type { AuditLog } from "../../../types/audit-log";

export function useAuditLogs() {
  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);

      const data =
        await auditLogApi.getRecent();

      setLogs(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load audit logs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs =
    useMemo(() => {
      const keyword =
        search.toLowerCase();

      return logs.filter(
        (log) =>
          log.description
            ?.toLowerCase()
            .includes(keyword) ||
          log.userName
            ?.toLowerCase()
            .includes(keyword) ||
          log.action
            ?.toLowerCase()
            .includes(keyword)
      );
    }, [logs, search]);

  return {
    logs,
    filteredLogs,
    search,
    setSearch,
    loading,
    loadLogs,
  };
}