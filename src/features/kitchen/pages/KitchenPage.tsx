import { RefreshCw } from "lucide-react";

import "../styles/kitchen.css";

import { KitchenTicketGrid } from "../components/KitchenTicketGrid";
import { useKitchen } from "../hooks/useKitchen";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function KitchenPage() {
  const {
    tickets,
    loading,
    updatingId,

    loadTickets,
    updateStatus,
  } = useKitchen();

  if (loading) {
    return (
      <PageLoader message="Loading kitchen..." />
    );
  }

  return (
    <div className="kitchen-page">
      <PageHeader
        title="Kitchen"
        description="Track active preparation tickets."
        actions={
          <button
            className="secondary-button"
            onClick={loadTickets}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <KitchenTicketGrid
        tickets={tickets}
        updatingId={updatingId}
        onUpdate={updateStatus}
      />
    </div>
  );
}