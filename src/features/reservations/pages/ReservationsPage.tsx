import "../styles/reservations.css";

import { ReservationTable } from "../components/ReservationTable";
import { useReservations } from "../hooks/useReservations";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function ReservationsPage() {
  const {
    reservations,
    loading,
    updatingReservationId,
    updateReservationStatus,
  } = useReservations();

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
    </div>
  );
}