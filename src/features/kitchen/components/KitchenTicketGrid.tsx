import { ChefHat } from "lucide-react";

import type {
  PreparationTicket,
  PreparationTicketStatus,
} from "../../../types/kitchen";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface Props {
  tickets: PreparationTicket[];
  updatingId: number | null;
  stationName?: string;

  onUpdate: (
    ticketId: number,
    status: PreparationTicketStatus
  ) => Promise<void>;
}

export function KitchenTicketGrid({
  tickets,
  updatingId,
  onUpdate,
  stationName = "Kitchen",
}: Props) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        title={`No active ${stationName.toLowerCase()} tickets`}
        description={`${stationName} preparation tickets will appear here.`}
        icon={<ChefHat size={22} />}
      />
    );
  }

  const getStatusVariant = (
    status: PreparationTicketStatus
  ): "warning" | "info" | "success" => {
    switch (status) {
      case "IN_PROGRESS":
        return "info";

      case "READY":
        return "success";

      default:
        return "warning";
    }
  };

  const getStatusLabel = (
    status: PreparationTicketStatus
  ) => {
    switch (status) {
      case "PENDING":
        return "PENDING";

      case "IN_PROGRESS":
        return "IN PREPARATION";

      case "READY":
        return "READY";

      default:
        return status;
    }
  };

  return (
    <div className="kitchen-grid">
      {tickets.map((ticket) => {
        const isUpdating = updatingId === ticket.id;

        return (
          <article
            className="kitchen-ticket"
            key={ticket.id}
          >
            <div className="kitchen-ticket-header">
              <div>
                <h3>Order #{ticket.orderId}</h3>
                <p>Ticket #{ticket.id}</p>
              </div>

              <ChefHat size={22} />
            </div>

            <StatusBadge
              variant={getStatusVariant(ticket.status)}
            >
              {getStatusLabel(ticket.status)}
            </StatusBadge>

            <div className="kitchen-items">
              {ticket.items.map((item) => (
                <div
                  className="kitchen-item"
                  key={item.id}
                >
                  <strong>{item.quantity}×</strong>
                  <span>{item.productName}</span>
                </div>
              ))}
            </div>

            <div className="kitchen-actions">
              <button
                className="secondary-button"
                disabled={
                  isUpdating ||
                  ticket.status !== "PENDING"
                }
                onClick={() =>
                  onUpdate(ticket.id, "IN_PROGRESS")
                }
              >
                {ticket.status === "IN_PROGRESS"
                  ? "In preparation"
                  : "Start"}
              </button>

              <button
                className="secondary-button"
                disabled={
                  isUpdating ||
                  ticket.status !== "IN_PROGRESS"
                }
                onClick={() =>
                  onUpdate(ticket.id, "READY")
                }
              >
                Ready
              </button>

              <button
                className="primary-button"
                disabled={
                  isUpdating ||
                  ticket.status !== "READY"
                }
                onClick={() =>
                  onUpdate(ticket.id, "DELIVERED")
                }
              >
                Delivered
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}