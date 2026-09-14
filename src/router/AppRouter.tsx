import {
  lazy,
  Suspense,
} from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { DashboardLayout } from "../layouts/DashboardLayout";

import { ProtectedRoute } from "./ProtectedRoute";
import { PermissionRoute } from "./PermissionRoute";

/* =========================================
   LAZY PAGES
========================================= */

const LoginPage = lazy(() =>
  import(
    "../features/auth/pages/LoginPage"
  ).then((module) => ({
    default: module.LoginPage,
  }))
);

const UnauthorizedPage = lazy(() =>
  import(
    "../features/auth/pages/UnauthorizedPage"
  ).then((module) => ({
    default: module.UnauthorizedPage,
  }))
);

const DashboardPage = lazy(() =>
  import(
    "../features/dashboard/pages/DashboardPage"
  ).then((module) => ({
    default: module.DashboardPage,
  }))
);

const ProductsPage = lazy(() =>
  import(
    "../features/products/pages/ProductsPage"
  ).then((module) => ({
    default: module.ProductsPage,
  }))
);

const CategoriesPage = lazy(() =>
  import(
    "../features/categories/pages/CategoriesPage"
  ).then((module) => ({
    default: module.CategoriesPage,
  }))
);



const CustomersPage = lazy(() =>
  import(
    "../features/customers/pages/CustomersPage"
  ).then((module) => ({
    default: module.CustomersPage,
  }))
);

const TablesPage = lazy(() =>
  import(
    "../features/tables/pages/TablesPage"
  ).then((module) => ({
    default: module.TablesPage,
  }))
);

const KitchenPage = lazy(() =>
  import(
    "../features/kitchen/pages/KitchenPage"
  ).then((module) => ({
    default: module.KitchenPage,
  }))
);

const PosPage = lazy(() =>
  import(
    "../features/pos/pages/PosPage"
  ).then((module) => ({
    default: module.PosPage,
  }))
);

const OrdersPage = lazy(() =>
  import(
    "../features/orders/pages/OrdersPage"
  ).then((module) => ({
    default: module.OrdersPage,
  }))
);

const PaymentsPage = lazy(() =>
  import(
    "../features/payments/pages/PaymentsPage"
  ).then((module) => ({
    default: module.PaymentsPage,
  }))
);

const InvoicesPage = lazy(() =>
  import(
    "../features/invoices/pages/InvoicesPage"
  ).then((module) => ({
    default: module.InvoicesPage,
  }))
);

const ReportsPage = lazy(() =>
  import(
    "../features/reports/pages/ReportsPage"
  ).then((module) => ({
    default: module.ReportsPage,
  }))
);

const ReservationsPage = lazy(() =>
  import(
    "../features/reservations/pages/ReservationsPage"
  ).then((module) => ({
    default: module.ReservationsPage,
  }))
);

const CashRegisterPage = lazy(() =>
  import(
    "../features/cash-register/pages/CashRegisterPage"
  ).then((module) => ({
    default: module.CashRegisterPage,
  }))
);

const SettingsPage = lazy(() =>
  import(
    "../features/settings/pages/SettingsPage"
  ).then((module) => ({
    default: module.SettingsPage,
  }))
);

const UsersPage = lazy(() =>
  import(
    "../features/users/pages/UsersPage"
  ).then((module) => ({
    default: module.UsersPage,
  }))
);

const AuditLogsPage = lazy(() =>
  import(
    "../features/audit-logs/pages/AuditLogsPage"
  ).then((module) => ({
    default: module.AuditLogsPage,
  }))
);

/* =========================================
   ROUTER
========================================= */

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="page-loading">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/unauthorized"
              element={
                <UnauthorizedPage />
              }
            />

            <Route
              path="/"
              element={
                <PermissionRoute
                  permissions={[
                    "DASHBOARD_VIEW",
                  ]}
                >
                  <DashboardPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/products"
              element={
                <PermissionRoute
                  permissions={[
                    "PRODUCT_VIEW",
                  ]}
                >
                  <ProductsPage />
                </PermissionRoute>
              }
            />
            <Route
  path="/categories"
  element={
    <PermissionRoute
      permissions={[
        "PRODUCT_VIEW",
      ]}
    >
      <CategoriesPage />
    </PermissionRoute>
  }
/>

            <Route
              path="/customers"
              element={
                <PermissionRoute
                  permissions={[
                    "CUSTOMER_VIEW",
                  ]}
                >
                  <CustomersPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/tables"
              element={
                <PermissionRoute
                  permissions={[
                    "TABLE_VIEW",
                  ]}
                >
                  <TablesPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/kitchen"
              element={
                <PermissionRoute
                  permissions={[
                    "KITCHEN_VIEW",
                  ]}
                >
                  <KitchenPage />
                </PermissionRoute>
              }
            />
            <Route
  path="/bar"
  element={
    <PermissionRoute
      permissions={["KITCHEN_VIEW"]}
    >
      <KitchenPage
        destination="BAR"
        title="Bar"
        description="Track drinks and bar preparation tickets."
      />
    </PermissionRoute>
  }
/>

<Route
  path="/patisserie"
  element={
    <PermissionRoute
      permissions={["KITCHEN_VIEW"]}
    >
      <KitchenPage
        destination="PATISSERIE"
        title="Patisserie"
        description="Track dessert and pastry preparation tickets."
      />
    </PermissionRoute>
  }
/>

            <Route
              path="/reservations"
              element={
                <PermissionRoute
                  permissions={[
                    "RESERVATION_VIEW",
                  ]}
                >
                  <ReservationsPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/payments"
              element={
                <PermissionRoute
                  permissions={[
                    "PAYMENT_CREATE",
                  ]}
                >
                  <PaymentsPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <PermissionRoute
                  permissions={[
                    "REPORT_VIEW",
                  ]}
                >
                  <ReportsPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/pos"
              element={
                <PermissionRoute
                  permissions={[
                    "POS_ACCESS",
                  ]}
                >
                  <PosPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PermissionRoute
                  permissions={[
                    "ORDER_VIEW",
                  ]}
                >
                  <OrdersPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/invoices"
              element={
                <PermissionRoute
                  permissions={[
                    "INVOICE_VIEW",
                  ]}
                >
                  <InvoicesPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/cash-register"
              element={
                <PermissionRoute
                  permissions={[
                    "CASH_REGISTER_VIEW",
                  ]}
                >
                  <CashRegisterPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <PermissionRoute
                  permissions={[
                    "SETTINGS_MANAGE",
                  ]}
                >
                  <SettingsPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/users"
              element={
                <PermissionRoute
                  permissions={[
                    "USER_MANAGE",
                  ]}
                >
                  <UsersPage />
                </PermissionRoute>
              }
            />

            <Route
              path="/audit-logs"
              element={
                <PermissionRoute
                  permissions={[
                    "AUDIT_LOG_VIEW",
                  ]}
                >
                  <AuditLogsPage />
                </PermissionRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}