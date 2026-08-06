import {
  Package,
  Receipt,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import type {
  SalesReport,
} from "../../../types/report";

interface ReportSummaryCardsProps {
  report: SalesReport;
}

interface ReportCard {
  title: string;
  value: string | number;
  icon: typeof TrendingUp;
}

export function ReportSummaryCards({
  report,
}: ReportSummaryCardsProps) {
  const cards: ReportCard[] = [
    {
      title: "Total Revenue",
      value: `${Number(
        report.totalRevenue ?? 0
      ).toFixed(2)} MAD`,
      icon: TrendingUp,
    },
    {
      title: "Paid Orders",
      value:
        report.paidOrdersCount ?? 0,
      icon: ShoppingCart,
    },
    {
      title: "Average Order",
      value: `${Number(
        report.averageOrderValue ?? 0
      ).toFixed(2)} MAD`,
      icon: Receipt,
    },
    {
      title: "Top Product",
      value:
        report.topSellingProduct
          ?.productName ?? "-",
      icon: Package,
    },
  ];

  return (
    <div className="report-summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            className="report-summary-card"
            key={card.title}
          >
            <div className="report-summary-card__icon">
              <Icon size={21} />
            </div>

            <div>
              <p>{card.title}</p>

              <h3>{card.value}</h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}