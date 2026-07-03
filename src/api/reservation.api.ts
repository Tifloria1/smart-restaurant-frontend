import { api } from "./axios";
import type {
  CreateReservationRequest,
  Reservation,
  ReservationStatus,
  UpdateReservationStatusRequest,
} from "../types/reservation";

export const reservationApi = {
  getAll: async (): Promise<Reservation[]> => {
    const response = await api.get<Reservation[]>("/reservations");
    return response.data;
  },

  create: async (request: CreateReservationRequest): Promise<Reservation> => {
    const response = await api.post<Reservation>("/reservations", request);
    return response.data;
  },

  updateStatus: async (
    id: number,
    request: UpdateReservationStatusRequest
  ): Promise<Reservation> => {
    const response = await api.patch<Reservation>(
      `/reservations/${id}/status`,
      request
    );
    return response.data;
  },

  getByStatus: async (status: ReservationStatus): Promise<Reservation[]> => {
    const response = await api.get<Reservation[]>(`/reservations/status/${status}`);
    return response.data;
  },
};