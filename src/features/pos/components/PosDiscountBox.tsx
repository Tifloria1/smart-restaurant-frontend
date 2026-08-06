import type {
  DiscountType,
} from "../hooks/usePos";

interface PosDiscountBoxProps {
  type: DiscountType;
  value: number;

  onTypeChange: (
    type: DiscountType
  ) => void;

  onValueChange: (
    value: number
  ) => void;
}

export function PosDiscountBox({
  type,
  value,
  onTypeChange,
  onValueChange,
}: PosDiscountBoxProps) {
  return (
    <section className="pos-discount-box">
      <div className="pos-cart-section-title">
        <h4>Discount</h4>

        <p>
          Apply a percentage or fixed discount.
        </p>
      </div>

      <div className="pos-discount-row">
        <select
          value={type}
          onChange={(event) =>
            onTypeChange(
              event.target
                .value as DiscountType
            )
          }
        >
          <option value="PERCENTAGE">
            Percentage (%)
          </option>

          <option value="FIXED">
            Fixed amount (MAD)
          </option>
        </select>

        <input
          type="number"
          min="0"
          max={
            type === "PERCENTAGE"
              ? 100
              : undefined
          }
          step={
            type === "PERCENTAGE"
              ? 1
              : 0.01
          }
          value={value}
          onChange={(event) =>
            onValueChange(
              Number(event.target.value)
            )
          }
        />
      </div>
    </section>
  );
}