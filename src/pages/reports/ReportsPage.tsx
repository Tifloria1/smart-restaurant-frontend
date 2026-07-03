import { useState } from "react";
import { reportApi } from "../../api/report.api";
import type { SalesReport } from "../../types/report";

export function ReportsPage() {
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");
  const [report, setReport] = useState<SalesReport | null>(null);

  const loadReport = async () => {
    const data = await reportApi.getSalesReport(startDate, endDate);
    setReport(data);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Reports</h2>
        <p>Analyze sales performance by date range.</p>
      </div>

      <div className="panel report-filter">
        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button className="primary-button" onClick={loadReport}>
          Generate Report
        </button>
      </div>

      {report && (
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Revenue</p>
              <h3>{report.totalRevenue} MAD</h3>
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Paid Orders</p>
              <h3>{report.paidOrdersCount}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p>Period</p>
              <h3>
                {report.startDate} → {report.endDate}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}