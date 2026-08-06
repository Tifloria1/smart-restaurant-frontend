import { api } from "./axios";
import type { AuditLog } from "../types/audit-log";

export const auditLogApi = {
  getRecent: async (): Promise<AuditLog[]> => {
    const response = await api.get<AuditLog[]>("/audit-logs");
    return response.data;
  },
};