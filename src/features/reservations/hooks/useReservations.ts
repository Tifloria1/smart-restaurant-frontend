import { useEffect, useState } from "react";
import { toast } from "sonner";

import { reservationApi } from "../../../api/reservation.api";

import type {
  Reservation,
  ReservationStatus,
} from "../../../types/reservation";

export function useReservations() {
  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingReservationId, setUpdatingReservationId] =
    useState<number | null>(null);

  const loadReservations = async () => {
    try {
      setLoading(true);

      const data = await reservationApi.getAll();

      setReservations(data);
    } catch (error) {
      console.error(
        "Failed to load reservations",
        error
      );

      toast.error(
        "Failed to load reservations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const updateReservationStatus = async (
    id: number,
    status: ReservationStatus
  ) => {
    try {
      setUpdatingReservationId(id);

      await reservationApi.updateStatus(id, {
        status,
      });

      toast.success(
        `Reservation marked as ${status.toLowerCase()}`
      );

      await loadReservations();
    } catch (error) {
      console.error(
        "Failed to update reservation status",
        error
      );

      toast.error(
        "Failed to update reservation status"
      );
    } finally {
      setUpdatingReservationId(null);
    }
  };

  return {
    reservations,
    loading,
    updatingReservationId,
    loadReservations,
    updateReservationStatus,
  };
}