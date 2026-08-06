export type RoleName = "ADMIN" | "MANAGER" | "CASHIER" | "KITCHEN";

export type PermissionName =
  | "DASHBOARD_VIEW"
  | "PRODUCT_VIEW"
  | "PRODUCT_CREATE"
  | "PRODUCT_UPDATE"
  | "PRODUCT_DELETE"
  | "CUSTOMER_VIEW"
  | "CUSTOMER_CREATE"
  | "CUSTOMER_UPDATE"
  | "CUSTOMER_DELETE"
  | "TABLE_VIEW"
  | "TABLE_MANAGE"
  | "POS_ACCESS"
  | "ORDER_VIEW"
  | "ORDER_CREATE"
  | "ORDER_CANCEL"
  | "KITCHEN_VIEW"
  | "TICKET_UPDATE"
  | "PAYMENT_CREATE"
  | "INVOICE_VIEW"
  | "INVOICE_DOWNLOAD"
  | "REPORT_VIEW"
  | "RESERVATION_VIEW"
  | "RESERVATION_MANAGE"
  | "CASH_REGISTER_VIEW"
  | "CASH_REGISTER_OPEN"
  | "CASH_REGISTER_CLOSE"
  | "USER_MANAGE"
  | "SETTINGS_MANAGE"
  | "AUDIT_LOG_VIEW";
  

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: RoleName;
  permissions: PermissionName[];
}