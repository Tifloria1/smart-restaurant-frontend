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

  onUpdate: (
    ticketId: number,
    status: PreparationTicketStatus
  ) => Promise<void>;
}

export function KitchenTicketGrid({
  tickets,
  updatingId,
  onUpdate,
}: Props) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        title="No active kitchen tickets"
        description="Kitchen preparation tickets will appear here."
        icon={<ChefHat size={22} />}
      />
    );
  }

  return (
    <div className="kitchen-grid">
      {tickets.map((ticket) => (
        <article
          className="kitchen-ticket"
          key={ticket.id}
        >
          <div className="kitchen-ticket-header">
            <div>
              <h3>
                Order #{ticket.orderId}
              </h3>

              <p>
                Ticket #{ticket.id}
              </p>
            </div>

            <ChefHat size={22} />
          </div>

          <StatusBadge variant="warning">
            {ticket.status}
          </StatusBadge>

          <div className="kitchen-items">
            {ticket.items.map((item) => (
              <div
                className="kitchen-item"
                key={item.id}
              >
                <strong>
                  {item.quantity}×
                </strong>

                <span>
                  {item.productName}
                </span>
              </div>
            ))}
          </div>

          <div className="kitchen-actions">
            <button
              className="secondary-button"
              disabled={
                updatingId === ticket.id
              }
              onClick={() =>
                onUpdate(
                  ticket.id,
                  "IN_PROGRESS"
                )
              }
            >
              Start
            </button>

            <button
              className="secondary-button"
              disabled={
                updatingId === ticket.id
              }
              onClick={() =>
                onUpdate(
                  ticket.id,
                  "READY"
                )
              }
            >
              Ready
            </button>

            <button
              className="primary-button"
              disabled={
                updatingId === ticket.id
              }
              onClick={() =>
                onUpdate(
                  ticket.id,
                  "DELIVERED"
                )
              }
            >
              Delivered
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}