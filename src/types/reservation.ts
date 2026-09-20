export type ReservationStatus = "PENDING" |  "SEATED" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Reservation {
  id: number;
  reservationDateTime: string;
  numberOfGuests: number;
  notes: string;
  status: ReservationStatus;
  customerId: number;
  customerName: string;
  diningTableId: number;
  tableNumber: string;
}

export interface CreateReservationRequest {
  customerId: number;
  diningTableId: number;
  reservationDateTime: string;
  numberOfGuests: number;
  notes: string;
}

export interface UpdateReservationStatusRequest {
  status: ReservationStatus;
}