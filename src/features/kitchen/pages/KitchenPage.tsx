import { RefreshCw } from "lucide-react";

import "../styles/kitchen.css";

import { KitchenTicketGrid } from "../components/KitchenTicketGrid";
import { useKitchen } from "../hooks/useKitchen";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

import type { ProductDestination } from "../../../types/kitchen";

interface Props {
  destination?: ProductDestination;
  title?: string;
  description?: string;
}

export function KitchenPage({
  destination = "KITCHEN",
  title = "Kitchen",
  description = "Track active kitchen preparation tickets.",
}: Props) {
  const {
    tickets,
    loading,
    updatingId,
    loadTickets,
    updateStatus,
  } = useKitchen(destination);

  if (loading) {
    return <PageLoader message={`Loading ${title.toLowerCase()}...`} />;
  }

  return (
    <div className="kitchen-page">
      <PageHeader
        title={title}
        description={description}
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
        stationName={title}
      />
    </div>
  );
}