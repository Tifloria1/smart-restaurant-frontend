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
    data: CreateProductRequest,
    imageFile?: File | null
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

  // =========================================================
  // PRODUCT IMAGE
  // =========================================================

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(
      product?.imageUrl
        ? `http://localhost:8083${product.imageUrl}`
        : null
    );

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

  // =========================================================
  // LOAD CATEGORIES
  // =========================================================

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

  // =========================================================
  // CLEAN IMAGE PREVIEW
  // =========================================================

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================================================
  // UPDATE FIELD
  // =========================================================

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

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ?? null;

    setImageFile(file);

    if (!file) {
      return;
    }

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit(
        {
          ...form,
          ...(isEditing
            ? { active }
            : {}),
        },
        imageFile
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <BaseModal
      title={
        isEditing
          ? "Edit Product"
          : "Add Product"
      }
      description={
        isEditing
          ? "Update product information, pricing, stock and image."
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
        {/* ===================================================
            PRODUCT IMAGE
        =================================================== */}

        <div className="product-form__field product-form__field--full">
          <label htmlFor="product-image">
            Product Image
          </label>

          {imagePreview && (
            <div
              style={{
                marginBottom: "12px",
              }}
            >
              <img
                src={imagePreview}
                alt="Product preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border:
                    "1px solid #e5e7eb",
                }}
              />
            </div>
          )}

          <input
            id="product-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
          />

          <small
            style={{
              display: "block",
              marginTop: "6px",
              color: "#64748b",
            }}
          >
            JPG, PNG or WEBP
          </small>
        </div>

        {/* ===================================================
            PRODUCT NAME
        =================================================== */}

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

        {/* ===================================================
            CATEGORY
        =================================================== */}

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

        {/* ===================================================
            PREPARATION DESTINATION
        =================================================== */}

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

        {/* ===================================================
            SELLING PRICE
        =================================================== */}

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

        {/* ===================================================
            COST PRICE
        =================================================== */}

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

        {/* ===================================================
            STOCK
        =================================================== */}

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

        {/* ===================================================
            LOW STOCK ALERT
        =================================================== */}

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

        {/* ===================================================
            STATUS - EDIT ONLY
        =================================================== */}

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

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

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