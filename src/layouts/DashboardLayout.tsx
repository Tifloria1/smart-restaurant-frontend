import {
  BarChart3,
  Bell,
  CalendarDays,
  ChefHat,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  ShieldCheck,
  Table2,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";
import { NavLink, Outlet } from "react-router-dom";

import { notificationApi } from "../api/notification.api";
import type { Notification } from "../api/notification.api";
import { settingsApi } from "../api/settings.api";
import { useAuth } from "../hooks/useAuth";
import type { PermissionName } from "../types/auth";

const navItems: {
  label: string;
  path: string;
  icon: ElementType;
  permission: PermissionName;
}[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    permission: "DASHBOARD_VIEW",
  },
  {
    label: "POS",
    path: "/pos",
    icon: ShoppingCart,
    permission: "POS_ACCESS",
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
    permission: "PRODUCT_VIEW",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
    permission: "CUSTOMER_VIEW",
  },
  {
    label: "Tables",
    path: "/tables",
    icon: Table2,
    permission: "TABLE_VIEW",
  },
  {
    label: "Kitchen",
    path: "/kitchen",
    icon: ChefHat,
    permission: "KITCHEN_VIEW",
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ClipboardList,
    permission: "ORDER_VIEW",
  },
  {
    label: "Payments",
    path: "/payments",
    icon: CreditCard,
    permission: "PAYMENT_CREATE",
  },
  {
    label: "Invoices",
    path: "/invoices",
    icon: Receipt,
    permission: "INVOICE_VIEW",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    permission: "REPORT_VIEW",
  },
  {
    label: "Reservations",
    path: "/reservations",
    icon: CalendarDays,
    permission: "RESERVATION_VIEW",
  },
  {
    label: "Cash Register",
    path: "/cash-register",
    icon: Wallet,
    permission: "CASH_REGISTER_VIEW",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    permission: "SETTINGS_MANAGE",
  },
  {
    label: "Users",
    path: "/users",
    icon: UserCog,
    permission: "USER_MANAGE",
  },
  {
    label: "Audit Logs",
    path: "/audit-logs",
    icon: ShieldCheck,
    permission: "AUDIT_LOG_VIEW",
  },
];

function getNotificationLabel(type: string) {
  switch (type) {
    case "LOW_STOCK":
      return "Stock";
    case "CASH_REGISTER":
      return "Cash Register";
    case "KITCHEN":
      return "Kitchen";
    case "RESERVATION":
      return "Reservations";
    default:
      return "Information";
  }
}

export function DashboardLayout() {
  const { user, logout } = useAuth();

  const notificationContainerRef = useRef<HTMLDivElement | null>(null);

  const [restaurantName, setRestaurantName] =
    useState("Smart Restaurant");

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await settingsApi.get();
        setRestaurantName(settings.restaurantName);
      } catch {
        setRestaurantName("Smart Restaurant");
      }
    };

    loadSettings();
  }, []);

  const loadNotifications = async () => {
    setNotificationsLoading(true);

    try {
      const data = await notificationApi.getAll();
      setNotifications(Array.isArray(data) ? data : []);
    } catch {
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();

    const intervalId = window.setInterval(() => {
      loadNotifications();
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const allowedNavItems = navItems.filter((item) =>
    user?.permissions?.includes(item.permission)
  );

  const toggleNotifications = async () => {
    const nextState = !notificationsOpen;
    setNotificationsOpen(nextState);

    if (nextState) {
      await loadNotifications();
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">SR</div>

          <div>
            <h2>{restaurantName}</h2>
            <p>Management System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {allowedNavItems.map((item) => {
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

        <button
          type="button"
          className="logout-button"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{restaurantName} Operations</h1>
            <p>Welcome back, {user?.fullName}</p>
          </div>

          <div className="topbar-actions">
            <div
              className="notification-container"
              ref={notificationContainerRef}
            >
              <button
                type="button"
                className="notification-button"
                onClick={toggleNotifications}
                aria-label="Open notifications"
              >
                <Bell size={21} />

                {notifications.length > 0 && (
                  <span className="notification-count">
                    {notifications.length > 9
                      ? "9+"
                      : notifications.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="notification-dropdown-header">
                    <div>
                      <h3>Notifications</h3>
                      <p>
                        {notifications.length} active alert
                        {notifications.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="notification-refresh-button"
                      onClick={loadNotifications}
                      disabled={notificationsLoading}
                    >
                      {notificationsLoading ? "Loading..." : "Refresh"}
                    </button>
                  </div>

                  <div className="notification-list">
                    {notificationsLoading && notifications.length === 0 ? (
                      <p className="notification-empty">
                        Loading notifications...
                      </p>
                    ) : notifications.length === 0 ? (
                      <p className="notification-empty">
                        No active notifications.
                      </p>
                    ) : (
                      notifications.map((notification, index) => (
                        <div
                          className="notification-item"
                          key={`${notification.type}-${index}`}
                        >
                          <span
                            className={`notification-dot ${notification.type.toLowerCase()}`}
                          />

                          <div>
                            <strong>
                              {getNotificationLabel(notification.type)}
                            </strong>
                            <p>{notification.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-badge">
              <span>{user?.role}</span>
            </div>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}