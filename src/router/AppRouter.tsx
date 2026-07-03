import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProductsPage } from "../pages/products/ProductsPage";
import { CustomersPage } from "../pages/customers/CustomersPage";
import { TablesPage } from "../pages/tables/TablesPage";
import { KitchenPage } from "../pages/kitchen/KitchenPage";
import { PosPage } from "../pages/pos/PosPage";
import { OrdersPage } from "../pages/orders/OrdersPage";
import { PaymentsPage } from "../pages/payments/PaymentsPage";
import { InvoicesPage } from "../pages/invoices/InvoicesPage";
import { ReportsPage } from "../pages/reports/ReportsPage";
import { ReservationsPage } from "../pages/reservations/ReservationsPage";
import { CashRegisterPage } from "../pages/cash-register/CashRegisterPage";



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
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />        
         <Route path="/pos" element={<PosPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/cash-register" element={<CashRegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}