import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { productApi } from "../../api/product.api";
import { tableApi } from "../../api/table.api";
import { orderApi } from "../../api/order.api";
import type { Product } from "../../types/product";
import type { DiningTable } from "../../types/table";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
}

export function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tables, setTables] = useState<DiningTable[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"SUR_PLACE" | "A_EMPORTER">("SUR_PLACE");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productApi.getAll().then(setProducts);
    tableApi.getAll().then(setTables);
  }, []);

  const activeProducts = products.filter((p) => p.active);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const increase = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const validateOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (orderType === "SUR_PLACE" && !selectedTableId) {
      toast.error("Please select a table");
      return;
    }

    setLoading(true);

    try {
      await orderApi.create({
        orderType,
        diningTableId: orderType === "SUR_PLACE" ? selectedTableId : null,
        customerId: null,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      toast.success("Order created successfully");
      setCart([]);
      setSelectedTableId(null);

      const updatedTables = await tableApi.getAll();
      setTables(updatedTables);
    } catch {
      toast.error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pos-page">
      <div className="pos-products">
        <div className="page-header">
          <h2>Point of Sale</h2>
          <p>Select products and validate customer orders.</p>
        </div>

        <div className="pos-product-grid">
          {activeProducts.map((product) => (
            <button
              key={product.id}
              className="pos-product-card"
              onClick={() => addToCart(product)}
            >
              <strong>{product.name}</strong>
              <span>{product.categoryName}</span>
              <b>{product.price} MAD</b>
            </button>
          ))}
        </div>
      </div>

      <aside className="pos-cart">
        <div className="cart-header">
          <ShoppingCart />
          <div>
            <h3>Current Order</h3>
            <p>{cart.length} items</p>
          </div>
        </div>

        <div className="order-type-switch">
          <button
            className={orderType === "SUR_PLACE" ? "active" : ""}
            onClick={() => setOrderType("SUR_PLACE")}
          >
            Dine-in
          </button>
          <button
            className={orderType === "A_EMPORTER" ? "active" : ""}
            onClick={() => {
              setOrderType("A_EMPORTER");
              setSelectedTableId(null);
            }}
          >
            Takeaway
          </button>
        </div>

        {orderType === "SUR_PLACE" && (
          <select
            className="cart-select"
            value={selectedTableId ?? ""}
            onChange={(e) => setSelectedTableId(Number(e.target.value))}
          >
            <option value="">Select table</option>
            {tables
              .filter((table) => table.status === "FREE")
              .map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.tableNumber} — {table.capacity} seats
                </option>
              ))}
          </select>
        )}

        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <div>
                <strong>{item.product.name}</strong>
                <p>{item.product.price} MAD</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decrease(item.product.id)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.product.id)}>
                  <Plus size={14} />
                </button>
                <button className="danger" onClick={() => removeItem(item.product.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {cart.length === 0 && <p className="muted">Cart is empty.</p>}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{total} MAD</strong>
          </div>

          <button className="primary-button full" onClick={validateOrder} disabled={loading}>
            {loading ? "Validating..." : "Validate Order"}
          </button>
        </div>
      </aside>
    </div>
  );
}