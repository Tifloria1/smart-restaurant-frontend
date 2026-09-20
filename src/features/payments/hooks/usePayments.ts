import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";
import { paymentApi } from "../../../api/payment.api";

import type { Order } from "../../../types/order";
import type { PaymentMethod } from "../../../types/payment";
import axios from "axios";

export function usePayments() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [payingId, setPayingId] =
    useState<number | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await orderApi.getAll();

      const pendingOrders = Array.isArray(data)
        ? data.filter(
            (order) => order.status === "PENDING"
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
  orderId: number,
  method: PaymentMethod
) => {
  try {
    setPayingId(orderId);

    await paymentApi.payOrder(orderId, {
      method,
    });

    toast.success(
      `Order #${orderId} paid successfully by ${method}`
    );

    await loadOrders();
  } catch (error: unknown) {
    console.error("Failed to pay order", error);

    let message = "Payment failed. Please try again.";

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (typeof data === "string" && data.trim()) {
        message = data;
      } else if (
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        message = data.message;
      } else if (
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof data.error === "string"
      ) {
        message = data.error;
      }
    }

    toast.error(message);
  } finally {
    setPayingId(null);
  }
};

  return {
    orders,
    loading,
    payingId,

    loadOrders,
    payOrder,
  };
}