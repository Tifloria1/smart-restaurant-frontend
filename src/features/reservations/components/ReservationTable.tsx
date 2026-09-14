import { CalendarDays } from "lucide-react";

import type {
  Reservation,
  ReservationStatus,
} from "../../../types/reservation";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface ReservationTableProps {
  reservations: Reservation[];
  updatingReservationId: number | null;

  onUpdateStatus: (
    id: number,
    status: ReservationStatus
  ) => Promise<void>;
}

function getStatusVariant(
  status: ReservationStatus
): "success" | "danger" | "warning" | "info" | "neutral" {
  switch (status) {
    case "CONFIRMED":
      return "info";

    case "COMPLETED":
      return "success";

    case "CANCELLED":
      return "danger";

    case "PENDING":
      return "warning";

    default:
      return "neutral";
  }
}

export function ReservationTable({
  reservations,
  updatingReservationId,
  onUpdateStatus,
}: ReservationTableProps) {
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        description="Reservations will appear here after they are created."
        icon={<CalendarDays size={22} />}
      />
    );
  }

  return (
    <div className="reservations-table-wrapper">
      <table className="data-table reservations-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Table</th>
            <th>Date & Time</th>
            <th>Guests</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => {
            const isUpdating =
              updatingReservationId === reservation.id;

            return (
              <tr key={reservation.id}>
                <td>
                  <strong>
                    {reservation.customerName}
                  </strong>
                </td>

                <td>
                  Table {reservation.tableNumber}
                </td>

                <td>
                  {new Date(
                    reservation.reservationDateTime
                  ).toLocaleString()}
                </td>

                <td>
                  {reservation.numberOfGuests}
                </td>

                <td>
                  {reservation.notes || "-"}
                </td>

                <td>
                  <StatusBadge
                    variant={getStatusVariant(
                      reservation.status
                    )}
                  >
                    {reservation.status}
                  </StatusBadge>
                </td>

                <td>
                  <div className="reservation-actions">
  {reservation.status === "PENDING" && (
    <>
      <button
        type="button"
        className="secondary-button"
        disabled={isUpdating}
        onClick={() =>
          onUpdateStatus(
            reservation.id,
            "CONFIRMED"
          )
        }
      >
        Confirm
      </button>

      <button
        type="button"
        className="secondary-button danger-button"
        disabled={isUpdating}
        onClick={() =>
          onUpdateStatus(
            reservation.id,
            "CANCELLED"
          )
        }
      >
        Cancel
      </button>
    </>
  )}

  {reservation.status === "CONFIRMED" && (
    <>
      <button
        type="button"
        className="secondary-button"
        disabled={isUpdating}
        onClick={() =>
          onUpdateStatus(
            reservation.id,
            "COMPLETED"
          )
        }
      >
        Complete
      </button>

      <button
        type="button"
        className="secondary-button danger-button"
        disabled={isUpdating}
        onClick={() =>
          onUpdateStatus(
            reservation.id,
            "CANCELLED"
          )
        }
      >
        Cancel
      </button>
    </>
  )}

  {(reservation.status === "COMPLETED" ||
    reservation.status === "CANCELLED") && (
    <span className="muted">
      No actions available
    </span>
  )}
</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}