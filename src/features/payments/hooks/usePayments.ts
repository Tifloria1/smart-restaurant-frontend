import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";
import { paymentApi } from "../../../api/payment.api";

import type { Order } from "../../../types/order";
import type { PaymentMethod } from "../../../types/payment";

export function usePayments() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [method, setMethod] =
    useState<PaymentMethod>("CASH");

  const [loading, setLoading] =
    useState(true);

  const [payingId, setPayingId] =
    useState<number | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await orderApi.getAll();

      const pendingOrders =
        Array.isArray(data)
          ? data.filter(
              (order) =>
                order.status === "PENDING"
            )
          : [];

      setOrders(pendingOrders);
    } catch (error) {
      console.error(
        "Failed to load pending payments",
        error
      );

      setOrders([]);

      toast.error(
        "Failed to load pending payments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const payOrder = async (
    orderId: number
  ) => {
    try {
      setPayingId(orderId);

      await paymentApi.payOrder(
        orderId,
        {
          method,
        }
      );

      toast.success(
        `Order #${orderId} paid successfully`
      );

      await loadOrders();
    } catch (error) {
      console.error(
        "Failed to pay order",
        error
      );

      toast.error(
        "Payment failed. Make sure all preparation tickets are delivered."
      );
    } finally {
      setPayingId(null);
    }
  };

  return {
    orders,
    method,
    loading,
    payingId,

    setMethod,
    loadOrders,
    payOrder,
  };
}