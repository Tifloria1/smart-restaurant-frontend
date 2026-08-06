import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";

import type { Order } from "../../../types/order";

export function useOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [cancellingId, setCancellingId] =
    useState<number | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await orderApi.getAll();

      setOrders(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load orders",
        error
      );

      setOrders([]);

      toast.error(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (
    order: Order
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to cancel order #${order.id}?\n\nThe stock will be restored and the table will be released.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(order.id);

      await orderApi.cancel(order.id);

      toast.success(
        `Order #${order.id} cancelled successfully`
      );

      await loadOrders();
    } catch (error) {
      console.error(
        `Failed to cancel order #${order.id}`,
        error
      );

      toast.error(
        `Failed to cancel order #${order.id}`
      );
    } finally {
      setCancellingId(null);
    }
  };

  return {
    orders,
    loading,
    cancellingId,

    loadOrders,
    cancelOrder,
  };
}