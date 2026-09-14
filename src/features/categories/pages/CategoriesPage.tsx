import { useState } from "react";
import { Tags } from "lucide-react";
import { toast } from "sonner";

import "../styles/categories.css";

import { CategoryFormModal } from "../components/CategoryFormModal";
import { CategoryTable } from "../components/CategoryTable";
import { useCategories } from "../hooks/useCategories";

import { categoryApi } from "../../../api/category.api";

import type { Category } from "../../../types/product";

import { EmptyState } from "../../../shared/components/EmptyState";
import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function CategoriesPage() {
  const {
    categories,
    loading,
    error,
    refreshCategories,
  } = useCategories();

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const handleDelete = async (
    category: Category
  ) => {
    const confirmed = window.confirm(
      `Delete category "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await categoryApi.delete(category.id);

      toast.success(
        "Category deleted successfully"
      );

      await refreshCategories();
    } catch (error) {
      console.error(
        "Failed to delete category",
        error
      );

      toast.error(
        "This category cannot be deleted because it may be used by existing products."
      );
    }
  };

  if (loading) {
    return (
      <PageLoader message="Loading categories..." />
    );
  }

  return (
    <div className="categories-page">
      <PageHeader
        title="Categories"
        description="Organize products into menu categories."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setCreateModalOpen(true)
            }
          >
            Add Category
          </button>
        }
      />

      {error && (
        <div className="categories-error">
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="No categories found"
            description="Create your first category to organize products."
            icon={<Tags size={22} />}
            action={
              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setCreateModalOpen(true)
                }
              >
                Add First Category
              </button>
            }
          />
        </div>
      ) : (
        <div className="panel">
          <CategoryTable
            categories={categories}
            onEdit={setEditingCategory}
            onDelete={handleDelete}
          />
        </div>
      )}

      {createModalOpen && (
        <CategoryFormModal
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSuccess={refreshCategories}
        />
      )}

      {editingCategory && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() =>
            setEditingCategory(null)
          }
          onSuccess={refreshCategories}
        />
      )}
    </div>
  );
}