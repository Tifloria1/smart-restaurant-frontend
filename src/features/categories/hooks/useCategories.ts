import { useCallback, useEffect, useState } from "react";
import { categoryApi } from "../../../api/category.api";
import type { Category } from "../../../types/product";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    refreshCategories: loadCategories,
  };
}