export type TableStatus = "FREE" | "OCCUPIED" | "RESERVED";

export interface DiningTable {
  id: number;
  tableNumber: string;
  capacity: number;
  status: TableStatus;
}