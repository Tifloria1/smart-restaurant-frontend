import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import { orderApi } from "../../../api/order.api";
import { productApi } from "../../../api/product.api";
import { tableApi } from "../../../api/table.api";

import type {
  OrderType,
} from "../../../types/order";

import type {
  Product,
} from "../../../types/product";

import type {
  DiningTable,
} from "../../../types/table";

export type DiscountType =
  | "PERCENTAGE"
  | "FIXED";

export interface PosCartItem {
  product: Product;
  quantity: number;
}

export function usePos() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [tables, setTables] =
    useState<DiningTable[]>([]);

  const [cart, setCart] =
    useState<PosCartItem[]>([]);

  const [orderType, setOrderType] =
    useState<OrderType>("SUR_PLACE");

  const [
    selectedTableId,
    setSelectedTableId,
  ] = useState<number | null>(null);

  const [discountType, setDiscountType] =
    useState<DiscountType>(
      "PERCENTAGE"
    );

  const [
    discountValue,
    setDiscountValue,
  ] = useState(0);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [validating, setValidating] =
    useState(false);

  const loadPosData = async () => {
    try {
      setInitialLoading(true);

      const [
        productsData,
        tablesData,
      ] = await Promise.all([
        productApi.getAll(),
        tableApi.getAll(),
      ]);

      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      );

      setTables(
        Array.isArray(tablesData)
          ? tablesData
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load POS data",
        error
      );

      setProducts([]);
      setTables([]);

      toast.error(
        "Failed to load POS data"
      );
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadPosData();
  }, []);

  const activeProducts = useMemo(
    () =>
      products.filter(
        (product) => product.active
      ),
    [products]
  );

  const availableTables = useMemo(
    () =>
      tables.filter(
        (table) =>
          table.status === "FREE"
      ),
    [tables]
  );

  const totalProductCount = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          Number(item.product.price) *
            item.quantity,
        0
      ),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (
      discountValue <= 0 ||
      subtotal <= 0
    ) {
      return 0;
    }

    if (
      discountType === "PERCENTAGE"
    ) {
      const amount =
        subtotal *
        (discountValue / 100);

      return Math.min(
        amount,
        subtotal
      );
    }

    return Math.min(
      discountValue,
      subtotal
    );
  }, [
    subtotal,
    discountType,
    discountValue,
  ]);

  const total = useMemo(
    () =>
      Math.max(
        subtotal - discountAmount,
        0
      ),
    [subtotal, discountAmount]
  );

  const addToCart = (
    product: Product
  ) => {
    if (product.stockQuantity <= 0) {
      toast.error(
        `${product.name} is out of stock`
      );

      return;
    }

    setCart((previousCart) => {
      const existingItem =
        previousCart.find(
          (item) =>
            item.product.id ===
            product.id
        );

      if (existingItem) {
        if (
          existingItem.quantity >=
          product.stockQuantity
        ) {
          toast.error(
            `Only ${product.stockQuantity} unit(s) of ${product.name} available`
          );

          return previousCart;
        }

        return previousCart.map(
          (item) =>
            item.product.id ===
            product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...previousCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (
    productId: number
  ) => {
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (
          item.product.id !== productId
        ) {
          return item;
        }

        if (
          item.quantity >=
          item.product.stockQuantity
        ) {
          toast.error(
            `Only ${item.product.stockQuantity} unit(s) of ${item.product.name} available`
          );

          return item;
        }

        return {
          ...item,
          quantity:
            item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (
    productId: number
  ) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.product.id ===
          productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const removeCartItem = (
    productId: number
  ) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          item.product.id !==
          productId
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const changeOrderType = (
    newOrderType: OrderType
  ) => {
    setOrderType(newOrderType);

    if (
      newOrderType === "A_EMPORTER"
    ) {
      setSelectedTableId(null);
    }
  };

  const changeDiscountType = (
    newDiscountType: DiscountType
  ) => {
    setDiscountType(
      newDiscountType
    );

    if (
      newDiscountType ===
        "PERCENTAGE" &&
      discountValue > 100
    ) {
      setDiscountValue(100);
    }
  };

  const resetOrder = () => {
    setCart([]);
    setSelectedTableId(null);

    setDiscountType(
      "PERCENTAGE"
    );

    setDiscountValue(0);
  };

  const validateOrderData = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");

      return false;
    }

    if (
      orderType === "SUR_PLACE" &&
      !selectedTableId
    ) {
      toast.error(
        "Please select a table"
      );

      return false;
    }

    if (discountValue < 0) {
      toast.error(
        "Discount cannot be negative"
      );

      return false;
    }

    if (
      discountType ===
        "PERCENTAGE" &&
      discountValue > 100
    ) {
      toast.error(
        "Percentage discount cannot exceed 100%"
      );

      return false;
    }

    for (const item of cart) {
      if (
        item.quantity >
        item.product.stockQuantity
      ) {
        toast.error(
          `${item.product.name}: only ${item.product.stockQuantity} unit(s) remaining`
        );

        return false;
      }
    }

    return true;
  };

  const validateOrder = async () => {
    if (!validateOrderData()) {
      return false;
    }

    try {
      setValidating(true);

      await orderApi.create({
        orderType,

        diningTableId:
          orderType === "SUR_PLACE"
            ? selectedTableId
            : null,

        customerId: null,

        discountType,
        discountValue,

        items: cart.map(
          (item) => ({
            productId:
              item.product.id,

            quantity:
              item.quantity,
          })
        ),
      });

      toast.success(
        "Order created successfully"
      );

      resetOrder();

      const [
        updatedTables,
        updatedProducts,
      ] = await Promise.all([
        tableApi.getAll(),
        productApi.getAll(),
      ]);

      setTables(
        Array.isArray(updatedTables)
          ? updatedTables
          : []
      );

      setProducts(
        Array.isArray(updatedProducts)
          ? updatedProducts
          : []
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to create order",
        error
      );

      toast.error(
        "Failed to create order"
      );

      return false;
    } finally {
      setValidating(false);
    }
  };

  return {
    products,
    activeProducts,

    tables,
    availableTables,

    cart,
    totalProductCount,

    orderType,
    selectedTableId,

    discountType,
    discountValue,

    subtotal,
    discountAmount,
    total,

    initialLoading,
    validating,

    setSelectedTableId,
    setDiscountValue,

    loadPosData,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
    clearCart,

    changeOrderType,
    changeDiscountType,

    validateOrder,
  };
}