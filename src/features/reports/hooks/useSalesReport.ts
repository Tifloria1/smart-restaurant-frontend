import { useState } from "react";
import { toast } from "sonner";

import { reportApi } from "../../../api/report.api";

import type {
  SalesReport,
} from "../../../types/report";

function getCurrentMonthStart() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  return `${year}-${month}-01`;
}

function getTodayDate() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function useSalesReport() {
  const [startDate, setStartDate] =
    useState(getCurrentMonthStart());

  const [endDate, setEndDate] =
    useState(getTodayDate());

  const [report, setReport] =
    useState<SalesReport | null>(null);

  const [loading, setLoading] =
    useState(false);

  const validateDates = () => {
    if (!startDate || !endDate) {
      toast.error(
        "Please select both dates"
      );

      return false;
    }

    if (startDate > endDate) {
      toast.error(
        "Start date cannot be after end date"
      );

      return false;
    }

    return true;
  };

  const loadReport = async () => {
    if (!validateDates()) {
      return;
    }

    try {
      setLoading(true);

      const data =
        await reportApi.getSalesReport(
          startDate,
          endDate
        );

      setReport(data);

      toast.success(
        "Report generated successfully"
      );
    } catch (error) {
      console.error(
        "Failed to generate sales report",
        error
      );

      toast.error(
        "Failed to generate report"
      );
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    if (!report) {
      toast.error(
        "Generate a report first"
      );

      return;
    }

    const rows: Array<
      Array<string | number | null | undefined>
    > = [
      ["Sales Report"],
      ["Start Date", report.startDate],
      ["End Date", report.endDate],
      ["Total Revenue", report.totalRevenue],
      ["Paid Orders", report.paidOrdersCount],
      [
        "Average Order",
        report.averageOrderValue,
      ],
      [],
      ["Top Products"],
      [
        "Product",
        "Quantity Sold",
        "Revenue",
      ],
      ...report.topProducts.map(
        (product) => [
          product.productName,
          product.quantitySold,
          product.revenue,
        ]
      ),
      [],
      ["Recent Paid Orders"],
      [
        "Order",
        "Customer",
        "Table",
        "Status",
        "Total",
        "Date",
      ],
      ...report.recentPaidOrders.map(
        (order) => [
          `#${order.id}`,
          order.customerName ?? "-",
          order.tableNumber ?? "-",
          order.status,
          order.totalAmount,
          new Date(
            order.createdAt
          ).toLocaleString(),
        ]
      ),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => {
            const text =
              String(value ?? "");

            return `"${text.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `sales-report-${report.startDate}-${report.endDate}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success(
      "CSV exported successfully"
    );
  };

  const printReport = () => {
    if (!report) {
      toast.error(
        "Generate a report first"
      );

      return;
    }

    const previousTitle =
      document.title;

    document.title =
      `Sales Report ${report.startDate} - ${report.endDate}`;

    window.print();

    window.setTimeout(() => {
      document.title =
        previousTitle;
    }, 500);
  };

  return {
    startDate,
    endDate,
    report,
    loading,

    setStartDate,
    setEndDate,

    loadReport,
    exportCsv,
    printReport,
  };
}