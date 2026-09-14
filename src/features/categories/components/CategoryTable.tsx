import { Pencil, Trash2, Tags } from "lucide-react";

import { StatusBadge } from "../../../shared/components/StatusBadge";

import type { Category } from "../../../types/product";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="categories-table-wrapper">
      <table className="data-table categories-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="category-main-cell">
                  <div className="category-mini-icon">
                    <Tags size={16} />
                  </div>

                  <strong>{category.name}</strong>
                </div>
              </td>

              <td>
                {category.description || "-"}
              </td>

              <td>
                <StatusBadge
                  variant={
                    category.active
                      ? "success"
                      : "danger"
                  }
                >
                  {category.active
                    ? "Active"
                    : "Inactive"}
                </StatusBadge>
              </td>

              <td>
                <div className="category-actions">
                  <button
                    type="button"
                    className="table-action-button"
                    title="Edit category"
                    aria-label={`Edit ${category.name}`}
                    onClick={() =>
                      onEdit(category)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    className="table-action-button table-action-button--delete"
                    title="Delete category"
                    aria-label={`Delete ${category.name}`}
                    onClick={() =>
                      onDelete(category)
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}