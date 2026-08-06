export interface ReportProduct {
  productId: number;
  productName: string;
  quantitySold: number;
  revenue: number;
}

export interface DailyRevenueReport {
  date: string;
  revenue: number;
}

export interface RecentPaidOrder {
  id: number;
  customerName: string | null;
  tableNumber: string | null;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface SalesReport {
  startDate: string;
  endDate: string;

  totalRevenue: number;
  paidOrdersCount: number;
  averageOrderValue: number;

  topSellingProduct: ReportProduct | null;
  lowestSellingProduct: ReportProduct | null;

  topProducts: ReportProduct[];
  dailyRevenue: DailyRevenueReport[];
  recentPaidOrders: RecentPaidOrder[];
}