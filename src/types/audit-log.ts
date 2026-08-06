export interface AuditLog {
  id: number;
  createdAt: string;
  action: string;
  description: string;
  entityName: string;
  entityId: number;
  userId: number;
  userName: string;
}