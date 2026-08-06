import { useEffect, useState } from "react";
import { toast } from "sonner";

import { kitchenApi } from "../../../api/kitchen.api";

import type {
  PreparationTicket,
  PreparationTicketStatus,
} from "../../../types/kitchen";

export function useKitchen() {
  const [tickets, setTickets] =
    useState<PreparationTicket[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);

      const data =
        await kitchenApi.getByDestination(
          "KITCHEN"
        );

      setTickets(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load kitchen tickets"
      );

      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const updateStatus = async (
    ticketId: number,
    status: PreparationTicketStatus
  ) => {
    try {
      setUpdatingId(ticketId);

      await kitchenApi.updateStatus(
        ticketId,
        status
      );

      await loadTickets();

      toast.success(
        "Ticket updated successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update ticket"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    tickets,
    loading,
    updatingId,

    loadTickets,
    updateStatus,
  };
}