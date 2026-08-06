import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";
import { paymentApi } from "../../../api/payment.api";

import type { Order } from "../../../types/order";

export function useInvoices() {
  const [paidOrders, setPaidOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [downloadingId, setDownloadingId] =
    useState<number | null>(null);

  const loadInvoices = async () => {
    try {
      setLoading(true);

      const orders = await orderApi.getAll();

      const invoices = Array.isArray(orders)
        ? orders.filter(
            (order) => order.status === "PAID"
          )
        : [];

      setPaidOrders(invoices);
    } catch (error) {
      console.error(
        "Failed to load invoices",
        error
      );

      setPaidOrders([]);

      toast.error(
        "Failed to load invoices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const downloadInvoice = async (
    orderId: number
  ) => {
    try {
      setDownloadingId(orderId);

      const blob =
        await paymentApi.downloadInvoicePdf(
          orderId
        );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = `invoice-${orderId}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success(
        `Invoice #${orderId} downloaded`
      );
    } catch (error) {
      console.error(
        "Failed to download invoice",
        error
      );

      toast.error(
        "Failed to download invoice"
      );
    } finally {
      setDownloadingId(null);
    }
  };

  return {
    paidOrders,
    loading,
    downloadingId,

    loadInvoices,
    downloadInvoice,
  };
}