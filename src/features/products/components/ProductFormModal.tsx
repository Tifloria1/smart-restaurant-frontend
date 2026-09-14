import { useEffect, useState } from "react";

import { categoryApi } from "../../../api/category.api";

import { BaseModal } from "../../../shared/components/BaseModal";

import type {
  Category,
  CreateProductRequest,
  Product,
  ProductDestination,
} from "../../../types/product";

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (
    data: CreateProductRequest
  ) => Promise<void>;
}

export function ProductFormModal({
  product,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const isEditing = Boolean(product);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [active, setActive] =
    useState(product?.active ?? true);

  const [form, setForm] =
    useState<CreateProductRequest>({
      name: product?.name ?? "",
      description:
        product?.description ?? "",
      price: product?.price ?? 0,
      costPrice:
        product?.costPrice ?? 0,
      stockQuantity:
        product?.stockQuantity ?? 0,
      stockAlertThreshold:
        product?.stockAlertThreshold ?? 10,
      destination:
        product?.destination ?? "KITCHEN",
      categoryId:
        product?.categoryId ?? 0,
    });

  useEffect(() => {
    categoryApi
      .getAll()
      .then((data) => {
        setCategories(data);

        if (
          !product &&
          form.categoryId === 0 &&
          data.length > 0
        ) {
          setForm((current) => ({
            ...current,
            categoryId: data[0].id,
          }));
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load categories",
          error
        );
      });
  }, []);

  const updateField = (
    field: keyof CreateProductRequest,
    value:
      | string
      | number
      | ProductDestination
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        ...form,
        ...(isEditing
          ? { active }
          : {}),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      title={
        isEditing
          ? "Edit Product"
          : "Add Product"
      }
      description={
        isEditing
          ? "Update product information, pricing and stock."
          : "Create a new menu item and configure its preparation details."
      }
      onClose={onClose}
      size="medium"
      footer={
        <>
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="product-form"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Product"}
          </button>
        </>
      }
    >
      <form
        id="product-form"
        className="product-form"
        onSubmit={handleSubmit}
      >
        <div className="product-form__field product-form__field--full">
          <label htmlFor="product-name">
            Product Name
            <span className="required-mark">
              *
            </span>
          </label>

          <input
            id="product-name"
            type="text"
            required
            value={form.name}
            placeholder="Example: Margherita Pizza"
            autoFocus
            onChange={(event) =>
              updateField(
                "name",
                event.target.value
              )
            }
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-category">
            Category
          </label>

          <select
            id="product-category"
            value={form.categoryId}
            required
            onChange={(event) =>
              updateField(
                "categoryId",
                Number(event.target.value)
              )
            }
          >
            {categories.length === 0 && (
              <option value={0}>
                No categories available
              </option>
            )}

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="product-form__field">
          <label htmlFor="product-destination">
            Preparation Destination
          </label>

          <select
            id="product-destination"
            value={form.destination}
            onChange={(event) =>
              updateField(
                "destination",
                event.target
                  .value as ProductDestination
              )
            }
          >
            <option value="NONE">
              None
            </option>

            <option value="KITCHEN">
              Kitchen
            </option>

            <option value="BAR">
              Bar
            </option>
            <option value="PATISSERIE">
              Patisserie
            </option>
          </select>
        </div>

        <div className="product-form__field">
          <label htmlFor="product-price">
            Selling Price (MAD)
          </label>

          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) =>
              updateField(
                "price",
                Number(event.target.value)
              )
            }
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-cost">
            Cost Price (MAD)
          </label>

          <input
            id="product-cost"
            type="number"
            min="0"
            step="0.01"
            value={form.costPrice}
            onChange={(event) =>
              updateField(
                "costPrice",
                Number(event.target.value)
              )
            }
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-stock">
            Stock Quantity
          </label>

          <input
            id="product-stock"
            type="number"
            min="0"
            value={form.stockQuantity}
            onChange={(event) =>
              updateField(
                "stockQuantity",
                Number(event.target.value)
              )
            }
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="product-alert">
            Low Stock Alert
          </label>

          <input
            id="product-alert"
            type="number"
            min="0"
            value={
              form.stockAlertThreshold
            }
            onChange={(event) =>
              updateField(
                "stockAlertThreshold",
                Number(event.target.value)
              )
            }
          />
        </div>

        {isEditing && (
          <div className="product-form__field">
            <label htmlFor="product-status">
              Status
            </label>

            <select
              id="product-status"
              value={
                active
                  ? "ACTIVE"
                  : "INACTIVE"
              }
              onChange={(event) =>
                setActive(
                  event.target.value ===
                    "ACTIVE"
                )
              }
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </div>
        )}

        <div className="product-form__field product-form__field--full">
          <label htmlFor="product-description">
            Description
          </label>

          <textarea
            id="product-description"
            value={form.description}
            placeholder="Optional product description..."
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
          />
        </div>
      </form>
    </BaseModal>
  );
}