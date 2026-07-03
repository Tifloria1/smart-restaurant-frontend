import { useEffect, useState } from "react";
import { BarChart3, Package, ShoppingCart, Users, AlertTriangle } from "lucide-react";
import { dashboardApi } from "../../api/dashboard.api";
import type { DashboardStats, TopProduct } from "../../types/dashboard";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, topProductsData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getTopProducts(),
        ]);

        setStats(statsData);
        setTopProducts(topProductsData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of today's restaurant activity.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Today Revenue" value={`${stats?.todayRevenue ?? 0} MAD`} icon={<BarChart3 />} />
        <StatCard title="Monthly Revenue" value={`${stats?.monthlyRevenue ?? 0} MAD`} icon={<BarChart3 />} />
        <StatCard title="Paid Orders" value={stats?.totalOrders ?? 0} icon={<ShoppingCart />} />
        <StatCard title="Products" value={stats?.totalProducts ?? 0} icon={<Package />} />
        <StatCard title="Customers" value={stats?.totalCustomers ?? 0} icon={<Users />} />
        <StatCard title="Low Stock" value={stats?.lowStockProducts ?? 0} icon={<AlertTriangle />} />
      </div>

      <div className="panel">
        <h3>Best Selling Products</h3>

        {topProducts.length === 0 ? (
          <p className="muted">No paid sales yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.totalQuantitySold}</td>
                  <td>{product.totalRevenue} MAD</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}