import { useEffect, useState } from "react";
import { ChefHat } from "lucide-react";
import { kitchenApi } from "../../api/kitchen.api";
import type {
  PreparationTicket,
  PreparationTicketStatus,
} from "../../types/kitchen";

export function KitchenPage() {
  const [tickets, setTickets] = useState<PreparationTicket[]>([]);

  const loadTickets = async () => {
    const data = await kitchenApi.getByDestination("KITCHEN");
    setTickets(data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const updateStatus = async (
    ticketId: number,
    status: PreparationTicketStatus
  ) => {
    await kitchenApi.updateStatus(ticketId, status);
    await loadTickets();
  };

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Kitchen Screen</h2>
          <p>Track active preparation tickets for kitchen products.</p>
        </div>

        <button className="secondary-button" onClick={loadTickets}>
          Refresh
        </button>
      </div>

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div className="ticket-card" key={ticket.id}>
            <div className="ticket-header">
              <div>
                <h3>Order #{ticket.orderId}</h3>
                <p>Ticket #{ticket.id}</p>
              </div>
              <div className="mini-icon">
                <ChefHat size={20} />
              </div>
            </div>

            <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>

            <div className="ticket-items">
              {ticket.items.map((item) => (
                <div className="ticket-item" key={item.id}>
                  <strong>{item.quantity}×</strong>
                  <span>{item.productName}</span>
                </div>
              ))}
            </div>

            <div className="ticket-actions">
              <button onClick={() => updateStatus(ticket.id, "IN_PROGRESS")}>
                Start
              </button>
              <button onClick={() => updateStatus(ticket.id, "READY")}>
                Ready
              </button>
              <button onClick={() => updateStatus(ticket.id, "DELIVERED")}>
                Delivered
              </button>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="empty-state">No active kitchen tickets.</div>
        )}
      </div>
    </div>
  );
}