export type ProductDestination = "NONE" | "KITCHEN" | "BAR";
export type PreparationTicketStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "READY"
  | "DELIVERED";

export interface PreparationTicketItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
}

export interface PreparationTicket {
  id: number;
  orderId: number;
  destination: ProductDestination;
  status: PreparationTicketStatus;
  createdAt: string;
  items: PreparationTicketItem[];
}