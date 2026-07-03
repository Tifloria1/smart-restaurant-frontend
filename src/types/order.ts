export type OrderType = "SUR_PLACE" | "A_EMPORTER";

export interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customerId?: number | null;
  diningTableId?: number | null;
  orderType: OrderType;
  items: CreateOrderItemRequest[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  createdAt: string;
  orderType: OrderType;
  status: "PENDING" | "PAID" | "CANCELLED";
  totalAmount: number;
  customerId?: number | null;
  customerName?: string | null;
  diningTableId?: number | null;
  tableNumber?: string | null;
  items: OrderItem[];
}