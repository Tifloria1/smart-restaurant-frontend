import { RefreshCw } from "lucide-react";

import "../styles/pos.css";

import { PosCart } from "../components/PosCart";
import { PosProductGrid } from "../components/PosProductGrid";

import { usePos } from "../hooks/usePos";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function PosPage() {
  const {
    activeProducts,
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
  } = usePos();

  if (initialLoading) {
    return (
      <PageLoader message="Loading point of sale..." />
    );
  }

  return (
    <div className="pos-page">
      <section className="pos-products">
        <PageHeader
          title="Point of Sale"
          description="Select products and validate customer orders."
          actions={
            <button
              type="button"
              className="secondary-button"
              onClick={loadPosData}
              disabled={validating}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          }
        />

        <div className="pos-products-panel">
          <PosProductGrid
            products={activeProducts}
            onAddProduct={addToCart}
          />
        </div>
      </section>

      <PosCart
        cart={cart}
        totalProductCount={
          totalProductCount
        }
        orderType={orderType}
        selectedTableId={
          selectedTableId
        }
        availableTables={
          availableTables
        }
        discountType={
          discountType
        }
        discountValue={
          discountValue
        }
        subtotal={subtotal}
        discountAmount={
          discountAmount
        }
        total={total}
        validating={validating}
        onOrderTypeChange={
          changeOrderType
        }
        onTableChange={
          setSelectedTableId
        }
        onIncrease={
          increaseQuantity
        }
        onDecrease={
          decreaseQuantity
        }
        onRemove={removeCartItem}
        onClear={clearCart}
        onDiscountTypeChange={
          changeDiscountType
        }
        onDiscountValueChange={
          setDiscountValue
        }
        onValidate={validateOrder}
      />
    </div>
  );
}