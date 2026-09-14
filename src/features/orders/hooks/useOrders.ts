import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";
import { tableApi } from "../../../api/table.api";

import type { Order } from "../../../types/order";
import type { DiningTable } from "../../../types/table";

export function useOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [tables, setTables] =
    useState<DiningTable[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    cancellingId,
    setCancellingId,
  ] = useState<number | null>(null);

  const [
    transferringId,
    setTransferringId,
  ] = useState<number | null>(null);

  // =========================================================
  // LOAD ORDERS
  // =========================================================

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data =
        await orderApi.getAll();

      setOrders(
        Array.isArray(data)
          ? data
          : []
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

  // =========================================================
  // LOAD TABLES
  // =========================================================

  const loadTables = async () => {
    try {
      const data =
        await tableApi.getAll();

      setTables(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load tables",
        error
      );

      setTables([]);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    void Promise.all([
      loadOrders(),
      loadTables(),
    ]);
  }, []);

  // =========================================================
  // CANCEL ORDER
  // =========================================================

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
      setCancellingId(
        order.id
      );

      await orderApi.cancel(
        order.id
      );

      toast.success(
        `Order #${order.id} cancelled successfully`
      );

      await Promise.all([
        loadOrders(),
        loadTables(),
      ]);
    } catch (error) {
      console.error(
        `Failed to cancel order #${order.id}`,
        error
      );

      toast.error(
        `Failed to cancel order #${order.id}`
      );
    } finally {
      setCancellingId(
        null
      );
    }
  };

  // =========================================================
  // TRANSFER ORDER
  // =========================================================

  const transferOrder = async (
    order: Order,
    targetTableId: number
  ) => {
    try {
      setTransferringId(
        order.id
      );

      const updatedOrder =
        await orderApi.transferTable(
          order.id,
          targetTableId
        );

      toast.success(
        `Order #${order.id} transferred to ${updatedOrder.tableNumber}`
      );

      await Promise.all([
        loadOrders(),
        loadTables(),
      ]);

      return true;
    } catch (error) {
      console.error(
        `Failed to transfer order #${order.id}`,
        error
      );

      toast.error(
        `Failed to transfer order #${order.id}`
      );

      return false;
    } finally {
      setTransferringId(
        null
      );
    }
  };

  // =========================================================
  // FREE TABLES
  // =========================================================

  const freeTables =
    tables.filter(
      (table) =>
        table.status === "FREE"
    );

  // =========================================================
  // RETURN
  // =========================================================

  return {
    orders,
    tables,
    freeTables,

    loading,
    cancellingId,
    transferringId,

    loadOrders,
    loadTables,

    cancelOrder,
    transferOrder,
  };
}