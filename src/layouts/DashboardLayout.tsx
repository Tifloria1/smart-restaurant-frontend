import {
  BarChart3,
  ChefHat,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  Table2,
  Users,
  CalendarDays,
 ShoppingCart,
 Wallet
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ClipboardList } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Products", path: "/products", icon: Package },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Tables", path: "/tables", icon: Table2 },
  { label: "Kitchen", path: "/kitchen", icon: ChefHat },
  { label: "Reservations", path: "/reservations", icon: CalendarDays },
  { label: "Payments", path: "/payments", icon: CreditCard },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Invoices", path: "/invoices", icon: Receipt },
  { label: "POS", path: "/pos", icon: ShoppingCart },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Cash Register", path: "/cash-register", icon: Wallet },
  
  
];

export function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">SR</div>
          <div>
            <h2>Smart Restaurant</h2>
            <p>Management System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button className="logout-button" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Restaurant Operations</h1>
            <p>Welcome back, {user?.fullName}</p>
          </div>

          <div className="user-badge">
            <span>{user?.role}</span>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}