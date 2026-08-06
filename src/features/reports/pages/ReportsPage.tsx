import {
  Download,
  Printer,
} from "lucide-react";

import "../styles/reports.css";

import { RecentPaidOrdersTable } from "../components/RecentPaidOrdersTable";
import { ReportFilters } from "../components/ReportFilters";
import { ReportSummaryCards } from "../components/ReportSummaryCards";
import { RevenueChart } from "../components/RevenueChart";
import { TopProductsChart } from "../components/TopProductsChart";

import { useSalesReport } from "../hooks/useSalesReport";

import { PageHeader } from "../../../shared/components/PageHeader";

export function ReportsPage() {
  const {
    startDate,
    endDate,
    report,
    loading,

    setStartDate,
    setEndDate,

    loadReport,
    exportCsv,
    printReport,
  } = useSalesReport();

  return (
    <div className="reports-page">
      <PageHeader
        title="Reports"
        description="Analyze sales performance by date range."
        actions={
          report ? (
            <>
              <button
                type="button"
                className="secondary-button"
                onClick={exportCsv}
              >
                <Download size={17} />
                Export CSV
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={printReport}
              >
                <Printer size={17} />
                Print / PDF
              </button>
            </>
          ) : undefined
        }
      />

      <ReportFilters
        startDate={startDate}
        endDate={endDate}
        loading={loading}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGenerate={loadReport}
      />

      {report && (
        <div
          id="printable-report"
          className="report-content"
        >
          <ReportSummaryCards
            report={report}
          />

          <div className="report-charts-grid">
            <RevenueChart
              data={report.dailyRevenue}
            />

            <TopProductsChart
              products={report.topProducts}
            />
          </div>

          <RecentPaidOrdersTable
            orders={report.recentPaidOrders}
          />
        </div>
      )}
    </div>
  );
}