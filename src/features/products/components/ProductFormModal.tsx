import { useEffect, useState } from "react";

import { categoryApi } from "../../../api/category.api";

import type {
  Category,
  CreateProductRequest,
  Product,
  ProductDestination,
} from "../../../types/product";

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: CreateProductRequest) => Promise<void>;
}

const destinations: ProductDestination[] = [
  "NONE",
  "KITCHEN",
  "BAR",
];

export function ProductFormModal({
  product,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateProductRequest>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    costPrice: product?.costPrice ?? 0,
    stockQuantity: product?.stockQuantity ?? 0,
    stockAlertThreshold: product?.stockAlertThreshold ?? 10,
    destination: product?.destination ?? "KITCHEN",
    categoryId: product?.categoryId ?? 1,
  });

  useEffect(() => {
    categoryApi
      .getAll()
      .then(setCategories)
      .catch((error) => {
        console.error("Failed to load categories", error);
      });
  }, []);

  const updateField = (
    field: keyof CreateProductRequest,
    value: string | number | ProductDestination
  ) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <form
        className="modal-card product-modal"
        onSubmit={handleSubmit}
      >
        <div className="modal-header">
          <div>
            <h3>
              {product ? "Edit Product" : "Add Product"}
            </h3>

            <p>Fill product information below.</p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="form-grid">
          <label>
            Name

            <input
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
            />
          </label>

          <label>
            Category

            <select
              value={form.categoryId}
              onChange={(event) =>
                updateField(
                  "categoryId",
                  Number(event.target.value)
                )
              }
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price

            <input
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
          </label>

          <label>
            Cost Price

            <input
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
          </label>

          <label>
            Stock Quantity

            <input
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
          </label>

          <label>
            Stock Alert

            <input
              type="number"
              min="0"
              value={form.stockAlertThreshold}
              onChange={(event) =>
                updateField(
                  "stockAlertThreshold",
                  Number(event.target.value)
                )
              }
            />
          </label>

          <label>
            Destination

            <select
              value={form.destination}
              onChange={(event) =>
                updateField(
                  "destination",
                  event.target.value as ProductDestination
                )
              }
            >
              {destinations.map((destination) => (
                <option
                  key={destination}
                  value={destination}
                >
                  {destination}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Description

          <textarea
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
          />
        </label>

        <div className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}