import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PermissionRoute } from "./PermissionRoute";

import { ProductsPage } from "../features/products/pages/ProductsPage";
import { CustomersPage } from "../features/customers/pages/CustomersPage";
import { TablesPage } from "../features/tables/pages/TablesPage";
import { KitchenPage } from "../features/kitchen/pages/KitchenPage";
import { PosPage } from "../features/pos/pages/PosPage";
import { OrdersPage } from "../features/orders/pages/OrdersPage";
import { PaymentsPage } from "../features/payments/pages/PaymentsPage";
import { InvoicesPage } from "../features/invoices/pages/InvoicesPage";
import { ReportsPage } from "../features/reports/pages/ReportsPage";
import { ReservationsPage } from "../features/reservations/pages/ReservationsPage";
import { CashRegisterPage } from "../features/cash-register/pages/CashRegisterPage";
import { SettingsPage } from "../features/settings/pages/SettingsPage";
import { UsersPage } from "../features/users/pages/UsersPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { UnauthorizedPage } from "../features/auth/pages/UnauthorizedPage";


import { AuditLogsPage } from "../features/audit-logs/pages/AuditLogsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/"
            element={
              <PermissionRoute permissions={["DASHBOARD_VIEW"]}>
                <DashboardPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PermissionRoute permissions={["PRODUCT_VIEW"]}>
                <ProductsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <PermissionRoute permissions={["CUSTOMER_VIEW"]}>
                <CustomersPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/tables"
            element={
              <PermissionRoute permissions={["TABLE_VIEW"]}>
                <TablesPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/kitchen"
            element={
              <PermissionRoute permissions={["KITCHEN_VIEW"]}>
                <KitchenPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/reservations"
            element={
              <PermissionRoute permissions={["RESERVATION_VIEW"]}>
                <ReservationsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <PermissionRoute permissions={["PAYMENT_CREATE"]}>
                <PaymentsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <PermissionRoute permissions={["REPORT_VIEW"]}>
                <ReportsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/pos"
            element={
              <PermissionRoute permissions={["POS_ACCESS"]}>
                <PosPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PermissionRoute permissions={["ORDER_VIEW"]}>
                <OrdersPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/invoices"
            element={
              <PermissionRoute permissions={["INVOICE_VIEW"]}>
                <InvoicesPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/cash-register"
            element={
              <PermissionRoute permissions={["CASH_REGISTER_VIEW"]}>
                <CashRegisterPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PermissionRoute permissions={["SETTINGS_MANAGE"]}>
                <SettingsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PermissionRoute permissions={["USER_MANAGE"]}>
                <UsersPage />
              </PermissionRoute>
            }
          />

          <Route
  path="/audit-logs"
  element={
    <PermissionRoute permissions={["AUDIT_LOG_VIEW"]}>
      <AuditLogsPage />
    </PermissionRoute>
  }
/>
        </Route>

        

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}