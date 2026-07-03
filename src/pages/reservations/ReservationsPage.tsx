import { useEffect, useState } from "react";
import { reservationApi } from "../../api/reservation.api";
import type { Reservation, ReservationStatus } from "../../types/reservation";

export function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const loadReservations = async () => {
    const data = await reservationApi.getAll();
    setReservations(data);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const updateStatus = async (id: number, status: ReservationStatus) => {
    await reservationApi.updateStatus(id, { status });
    await loadReservations();
  };

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Reservations</h2>
          <p>Manage table reservations and booking status.</p>
        </div>
      </div>

      <div className="panel">
        <table className="data-table">
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
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.customerName}</td>
                <td>{reservation.tableNumber}</td>
                <td>{new Date(reservation.reservationDateTime).toLocaleString()}</td>
                <td>{reservation.numberOfGuests}</td>
                <td>{reservation.notes || "-"}</td>
                <td>
                  <span className={`status ${reservation.status.toLowerCase()}`}>
                    {reservation.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="secondary-button"
                      onClick={() => updateStatus(reservation.id, "CONFIRMED")}
                    >
                      Confirm
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => updateStatus(reservation.id, "COMPLETED")}
                    >
                      Complete
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => updateStatus(reservation.id, "CANCELLED")}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reservations.length === 0 && <p className="muted">No reservations found.</p>}
      </div>
    </div>
  );
}