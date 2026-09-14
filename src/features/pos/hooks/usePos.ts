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
  // =========================================================
  // STATE
  // =========================================================

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

  const [
    discountType,
    setDiscountType,
  ] = useState<DiscountType>(
    "PERCENTAGE"
  );

  const [
    discountValue,
    setDiscountValue,
  ] = useState(0);

  const [
    initialLoading,
    setInitialLoading,
  ] = useState(true);

  const [
    validating,
    setValidating,
  ] = useState(false);

  // =========================================================
  // LOAD POS DATA
  // =========================================================

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

  // =========================================================
  // PRODUCTS
  // =========================================================

  const activeProducts =
    useMemo(
      () =>
        products.filter(
          (product) =>
            product.active
        ),
      [products]
    );

  // =========================================================
  // TABLES
  // =========================================================

  /*
   * IMPORTANT:
   *
   * We show BOTH:
   * FREE tables
   * OCCUPIED tables
   *
   * FREE:
   * create a new order.
   *
   * OCCUPIED:
   * find its active order
   * and add items to that order.
   */
  const availableTables =
    useMemo(
      () =>
        tables.filter(
          (table) =>
            table.status === "FREE" ||
            table.status ===
              "OCCUPIED"
        ),
      [tables]
    );

  // =========================================================
  // CART TOTAL COUNT
  // =========================================================

  const totalProductCount =
    useMemo(
      () =>
        cart.reduce(
          (
            total,
            item
          ) =>
            total +
            item.quantity,
          0
        ),
      [cart]
    );

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal =
    useMemo(
      () =>
        cart.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.product.price
            ) *
              item.quantity,
          0
        ),
      [cart]
    );

  // =========================================================
  // DISCOUNT
  // =========================================================

  const discountAmount =
    useMemo(() => {
      if (
        discountValue <= 0 ||
        subtotal <= 0
      ) {
        return 0;
      }

      if (
        discountType ===
        "PERCENTAGE"
      ) {
        const amount =
          subtotal *
          (discountValue /
            100);

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

  // =========================================================
  // TOTAL
  // =========================================================

  const total =
    useMemo(
      () =>
        Math.max(
          subtotal -
            discountAmount,
          0
        ),
      [
        subtotal,
        discountAmount,
      ]
    );

  // =========================================================
  // ADD PRODUCT TO CART
  // =========================================================

  const addToCart = (
    product: Product
  ) => {
    if (
      product.stockQuantity <=
      0
    ) {
      toast.error(
        `${product.name} is out of stock`
      );

      return;
    }

    setCart(
      (previousCart) => {
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
                      item.quantity +
                      1,
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
      }
    );
  };

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQuantity = (
    productId: number
  ) => {
    setCart(
      (previousCart) =>
        previousCart.map(
          (item) => {
            if (
              item.product.id !==
              productId
            ) {
              return item;
            }

            if (
              item.quantity >=
              item.product
                .stockQuantity
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
          }
        )
    );
  };

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQuantity = (
    productId: number
  ) => {
    setCart(
      (previousCart) =>
        previousCart
          .map((item) =>
            item.product.id ===
            productId
              ? {
                  ...item,

                  quantity:
                    item.quantity -
                    1,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          )
    );
  };

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeCartItem = (
    productId: number
  ) => {
    setCart(
      (previousCart) =>
        previousCart.filter(
          (item) =>
            item.product.id !==
            productId
        )
    );
  };

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCart([]);
  };

  // =========================================================
  // CHANGE ORDER TYPE
  // =========================================================

  const changeOrderType = (
    newOrderType: OrderType
  ) => {
    setOrderType(
      newOrderType
    );

    if (
      newOrderType ===
      "A_EMPORTER"
    ) {
      setSelectedTableId(
        null
      );
    }
  };

  // =========================================================
  // CHANGE DISCOUNT TYPE
  // =========================================================

  const changeDiscountType = (
    newDiscountType:
      DiscountType
  ) => {
    setDiscountType(
      newDiscountType
    );

    if (
      newDiscountType ===
        "PERCENTAGE" &&
      discountValue > 100
    ) {
      setDiscountValue(
        100
      );
    }
  };

  // =========================================================
  // RESET ORDER
  // =========================================================

  const resetOrder = () => {
    setCart([]);

    setSelectedTableId(
      null
    );

    setDiscountType(
      "PERCENTAGE"
    );

    setDiscountValue(0);
  };

  // =========================================================
  // VALIDATE ORDER DATA
  // =========================================================

  const validateOrderData =
    () => {
      if (
        cart.length === 0
      ) {
        toast.error(
          "Cart is empty"
        );

        return false;
      }

      if (
        orderType ===
          "SUR_PLACE" &&
        !selectedTableId
      ) {
        toast.error(
          "Please select a table"
        );

        return false;
      }

      if (
        discountValue < 0
      ) {
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

      for (
        const item of cart
      ) {
        if (
          item.quantity >
          item.product
            .stockQuantity
        ) {
          toast.error(
            `${item.product.name}: only ${item.product.stockQuantity} unit(s) remaining`
          );

          return false;
        }
      }

      return true;
    };

  // =========================================================
  // VALIDATE ORDER
  // =========================================================

  const validateOrder =
    async () => {
      if (
        !validateOrderData()
      ) {
        return false;
      }

      try {
        setValidating(true);

        const request = {
          orderType,

          diningTableId:
            orderType ===
            "SUR_PLACE"
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
        };

        // =====================================================
        // TAKEAWAY
        // =====================================================

        if (
          orderType ===
          "A_EMPORTER"
        ) {
          const order =
            await orderApi.create(
              request
            );

          toast.success(
            `Order #${order.id} created successfully`
          );
        }

        // =====================================================
        // ON-SITE / TABLE
        // =====================================================

        else {
          if (
            !selectedTableId
          ) {
            toast.error(
              "Please select a table"
            );

            return false;
          }

          const selectedTable =
            tables.find(
              (table) =>
                table.id ===
                selectedTableId
            );

          if (
            !selectedTable
          ) {
            toast.error(
              "Selected table not found"
            );

            return false;
          }

          // ===================================================
          // FREE TABLE
          // CREATE NEW ORDER
          // ===================================================

          if (
            selectedTable.status ===
            "FREE"
          ) {
            const order =
              await orderApi.create(
                request
              );

            toast.success(
              `Order #${order.id} created successfully`
            );
          }

          // ===================================================
          // OCCUPIED TABLE
          // ADD TO EXISTING ORDER
          // ===================================================

          else if (
            selectedTable.status ===
            "OCCUPIED"
          ) {
            const activeOrder =
              await orderApi
                .getActiveByTable(
                  selectedTableId
                );

            const updatedOrder =
              await orderApi.addItems(
                activeOrder.id,
                request
              );

            toast.success(
              `Items added to order #${updatedOrder.id}`
            );
          }

          // ===================================================
          // UNKNOWN TABLE STATUS
          // ===================================================

          else {
            toast.error(
              "This table is not available"
            );

            return false;
          }
        }

        // =====================================================
        // SUCCESS
        // =====================================================

        resetOrder();

        const [
          updatedTables,
          updatedProducts,
        ] =
          await Promise.all([
            tableApi.getAll(),
            productApi.getAll(),
          ]);

        setTables(
          Array.isArray(
            updatedTables
          )
            ? updatedTables
            : []
        );

        setProducts(
          Array.isArray(
            updatedProducts
          )
            ? updatedProducts
            : []
        );

        return true;
      } catch (error) {
        console.error(
          "Failed to validate order",
          error
        );

        toast.error(
          "Failed to validate order"
        );

        return false;
      } finally {
        setValidating(false);
      }
    };

  // =========================================================
  // RETURN
  // =========================================================

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