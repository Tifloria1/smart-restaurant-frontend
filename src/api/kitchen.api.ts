import { api } from "./axios";
import type {
  PreparationTicket,
  PreparationTicketStatus,
  ProductDestination,
} from "../types/kitchen";

export const kitchenApi = {
  getByDestination: async (
    destination: ProductDestination
  ): Promise<PreparationTicket[]> => {
    const response = await api.get<PreparationTicket[]>(
      `/preparation-tickets/destination/${destination}`
    );
    return response.data;
  },

  updateStatus: async (
    ticketId: number,
    status: PreparationTicketStatus
  ): Promise<PreparationTicket> => {
    const response = await api.patch<PreparationTicket>(
      `/preparation-tickets/${ticketId}/status`,
      { status }
    );
    return response.data;
  },
};