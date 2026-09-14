import { useState } from "react";
import { toast } from "sonner";

import { BaseModal } from "../../../shared/components/BaseModal";
import { categoryApi } from "../../../api/category.api";

import type { Category } from "../../../types/product";

interface CategoryFormModalProps {
  category?: Category | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function CategoryFormModal({
  category,
  onClose,
  onSuccess,
}: CategoryFormModalProps) {
  const isEditing = Boolean(category);

  const [name, setName] =
    useState(category?.name ?? "");

  const [description, setDescription] =
    useState(category?.description ?? "");

  const [active, setActive] =
    useState(category?.active ?? true);

  const [saving, setSaving] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setSaving(true);

      if (category) {
        await categoryApi.update(
          category.id,
          {
            name: name.trim(),
            description:
              description.trim(),
            active,
          }
        );
      } else {
        await categoryApi.create({
          name: name.trim(),
          description:
            description.trim(),
        });
      }
    } catch (error) {
      console.error(
        "Failed to save category",
        error
      );

      toast.error(
        isEditing
          ? "Failed to update category"
          : "Failed to create category"
      );

      return;
    } finally {
      setSaving(false);
    }

    toast.success(
      isEditing
        ? "Category updated successfully"
        : "Category created successfully"
    );

    try {
      await onSuccess();
    } catch (error) {
      console.error(
        "Category saved but refresh failed",
        error
      );
    }

    onClose();
  };

  return (
    <BaseModal
      title={
        isEditing
          ? "Edit Category"
          : "Add Category"
      }
      description={
        isEditing
          ? "Update category information."
          : "Create a new product category."
      }
      onClose={onClose}
      size="small"
      footer={
        <>
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="category-form"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Category"}
          </button>
        </>
      }
    >
      <form
        id="category-form"
        className="category-form"
        onSubmit={handleSubmit}
      >
        <div className="category-form__field">
          <label htmlFor="category-name">
            Category Name
          </label>

          <input
            id="category-name"
            type="text"
            value={name}
            placeholder="Example: Drinks"
            autoFocus
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="category-form__field">
          <label htmlFor="category-description">
            Description
          </label>

          <textarea
            id="category-description"
            value={description}
            placeholder="Optional category description..."
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
          />
        </div>

        {isEditing && (
          <label className="category-form__checkbox">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) =>
                setActive(
                  event.target.checked
                )
              }
            />

            <span>Active category</span>
          </label>
        )}
      </form>
    </BaseModal>
  );
}