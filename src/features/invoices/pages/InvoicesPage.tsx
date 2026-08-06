import { RefreshCw } from "lucide-react";

import "../styles/invoices.css";

import { InvoiceTable } from "../components/InvoiceTable";
import { useInvoices } from "../hooks/useInvoices";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function InvoicesPage() {
  const {
    paidOrders,
    loading,
    downloadingId,

    loadInvoices,
    downloadInvoice,
  } = useInvoices();

  if (loading) {
    return (
      <PageLoader message="Loading invoices..." />
    );
  }

  return (
    <div className="invoices-page">
      <PageHeader
        title="Invoices"
        description="Download generated invoices for paid orders."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={loadInvoices}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <div className="panel">
        <InvoiceTable
          invoices={paidOrders}
          downloadingId={downloadingId}
          onDownload={downloadInvoice}
        />
      </div>
    </div>
  );
}