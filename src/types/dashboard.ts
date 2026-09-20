export interface DashboardStats {
  todayRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  lowStockProducts: number;
  averageOrderValue: number;
  openTables: number;
  todayReservations: number;
}

export interface TopProduct {
  productId: number;
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface RecentOrder {
  id: number;
  createdAt: string;
  orderType: string;
  status: string;
  totalAmount: number;
  customerName?: string | null;
  tableNumber?: string | null;
}