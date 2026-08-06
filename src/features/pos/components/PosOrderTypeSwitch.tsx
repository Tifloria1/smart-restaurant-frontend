import type {
  OrderType,
} from "../../../types/order";

interface PosOrderTypeSwitchProps {
  value: OrderType;

  onChange: (
    orderType: OrderType
  ) => void;
}

export function PosOrderTypeSwitch({
  value,
  onChange,
}: PosOrderTypeSwitchProps) {
  return (
    <div className="pos-order-type-switch">
      <button
        type="button"
        className={
          value === "SUR_PLACE"
            ? "active"
            : ""
        }
        onClick={() =>
          onChange("SUR_PLACE")
        }
      >
        Dine-in
      </button>

      <button
        type="button"
        className={
          value === "A_EMPORTER"
            ? "active"
            : ""
        }
        onClick={() =>
          onChange("A_EMPORTER")
        }
      >
        Takeaway
      </button>
    </div>
  );
}