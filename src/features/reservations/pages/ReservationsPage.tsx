import { useState } from "react";

import "../styles/reservations.css";

import { ReservationFormModal } from "../components/ReservationFormModal";
import { ReservationTable } from "../components/ReservationTable";
import { useReservations } from "../hooks/useReservations";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function ReservationsPage() {
  const {
    reservations,
    loading,
    updatingReservationId,
    loadReservations,
    updateReservationStatus,
  } = useReservations();

  const [modalOpen, setModalOpen] =
    useState(false);

  if (loading) {
    return (
      <PageLoader message="Loading reservations..." />
    );
  }

  return (
    <div className="reservations-page">
      <PageHeader
        title="Reservations"
        description="Manage table reservations and booking status."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setModalOpen(true)
            }
          >
            Add Reservation
          </button>
        }
      />

      <div className="panel">
        <ReservationTable
          reservations={reservations}
          updatingReservationId={
            updatingReservationId
          }
          onUpdateStatus={
            updateReservationStatus
          }
        />
      </div>

      {modalOpen && (
        <ReservationFormModal
          onClose={() =>
            setModalOpen(false)
          }
          onSuccess={loadReservations}
        />
      )}
    </div>
  );
}