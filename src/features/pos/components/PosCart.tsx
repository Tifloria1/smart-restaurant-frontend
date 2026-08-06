import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import type {
  DiningTable,
} from "../../../types/table";

import type {
  OrderType,
} from "../../../types/order";

import type {
  DiscountType,
  PosCartItem,
} from "../hooks/usePos";

import { PosDiscountBox } from "./PosDiscountBox";
import { PosOrderTypeSwitch } from "./PosOrderTypeSwitch";

interface PosCartProps {
  cart: PosCartItem[];
  totalProductCount: number;

  orderType: OrderType;
  selectedTableId: number | null;
  availableTables: DiningTable[];

  discountType: DiscountType;
  discountValue: number;

  subtotal: number;
  discountAmount: number;
  total: number;

  validating: boolean;

  onOrderTypeChange: (
    orderType: OrderType
  ) => void;

  onTableChange: (
    tableId: number | null
  ) => void;

  onIncrease: (
    productId: number
  ) => void;

  onDecrease: (
    productId: number
  ) => void;

  onRemove: (
    productId: number
  ) => void;

  onClear: () => void;

  onDiscountTypeChange: (
    type: DiscountType
  ) => void;

  onDiscountValueChange: (
    value: number
  ) => void;

  onValidate: () => Promise<boolean>;
}

export function PosCart({
  cart,
  totalProductCount,

  orderType,
  selectedTableId,
  availableTables,

  discountType,
  discountValue,

  subtotal,
  discountAmount,
  total,

  validating,

  onOrderTypeChange,
  onTableChange,

  onIncrease,
  onDecrease,
  onRemove,
  onClear,

  onDiscountTypeChange,
  onDiscountValueChange,

  onValidate,
}: PosCartProps) {
  return (
    <aside className="pos-cart">
      <div className="pos-cart-header">
        <div className="pos-cart-header__icon">
          <ShoppingCart size={21} />
        </div>

        <div>
          <h3>Current Order</h3>

          <p>
            {totalProductCount} item
            {totalProductCount === 1
              ? ""
              : "s"}
          </p>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            className="pos-clear-cart-button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>

      <PosOrderTypeSwitch
        value={orderType}
        onChange={onOrderTypeChange}
      />

      {orderType === "SUR_PLACE" && (
        <div className="pos-table-selector">
          <label htmlFor="pos-table">
            Dining Table
          </label>

          <select
            id="pos-table"
            value={selectedTableId ?? ""}
            onChange={(event) => {
              const value =
                event.target.value;

              onTableChange(
                value
                  ? Number(value)
                  : null
              );
            }}
          >
            <option value="">
              Select table
            </option>

            {availableTables.map(
              (table) => (
                <option
                  key={table.id}
                  value={table.id}
                >
                  Table{" "}
                  {table.tableNumber} —{" "}
                  {table.capacity} seats
                </option>
              )
            )}
          </select>

          {availableTables.length === 0 && (
            <p className="pos-table-warning">
              No free dining tables available.
            </p>
          )}
        </div>
      )}

      <div className="pos-cart-items">
        {cart.length === 0 ? (
          <div className="pos-cart-empty">
            <ShoppingCart size={26} />

            <p>Cart is empty.</p>

            <span>
              Select a product to add it.
            </span>
          </div>
        ) : (
          cart.map((item) => (
            <article
              className="pos-cart-item"
              key={item.product.id}
            >
              <div className="pos-cart-item__info">
                <strong>
                  {item.product.name}
                </strong>

                <p>
                  {Number(
                    item.product.price
                  ).toFixed(2)}{" "}
                  MAD
                </p>

                <small>
                  Available:{" "}
                  {
                    item.product
                      .stockQuantity
                  }
                </small>
              </div>

              <div className="pos-quantity-controls">
                <button
                  type="button"
                  aria-label={`Decrease ${item.product.name}`}
                  onClick={() =>
                    onDecrease(
                      item.product.id
                    )
                  }
                >
                  <Minus size={14} />
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  type="button"
                  aria-label={`Increase ${item.product.name}`}
                  onClick={() =>
                    onIncrease(
                      item.product.id
                    )
                  }
                >
                  <Plus size={14} />
                </button>

                <button
                  type="button"
                  className="pos-remove-item-button"
                  aria-label={`Remove ${item.product.name}`}
                  onClick={() =>
                    onRemove(
                      item.product.id
                    )
                  }
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <PosDiscountBox
        type={discountType}
        value={discountValue}
        onTypeChange={
          onDiscountTypeChange
        }
        onValueChange={
          onDiscountValueChange
        }
      />

      <div className="pos-cart-footer">
        <div className="pos-order-totals">
          <div>
            <span>Subtotal</span>

            <strong>
              {subtotal.toFixed(2)} MAD
            </strong>
          </div>

          <div>
            <span>Discount</span>

            <strong>
              -{" "}
              {discountAmount.toFixed(
                2
              )}{" "}
              MAD
            </strong>
          </div>

          <hr />

          <div className="pos-grand-total">
            <span>Total</span>

            <strong>
              {total.toFixed(2)} MAD
            </strong>
          </div>
        </div>

        <button
          type="button"
          className="primary-button pos-validate-button"
          disabled={
            validating ||
            cart.length === 0
          }
          onClick={onValidate}
        >
          {validating
            ? "Validating..."
            : "Validate Order"}
        </button>
      </div>
    </aside>
  );
}