import { useEffect, useState } from "react";
import { toast } from "sonner";

import { tableApi } from "../../../api/table.api";

import type { DiningTable } from "../../../types/table";

export function useTables() {
  const [tables, setTables] =
    useState<DiningTable[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadTables = async () => {
    try {
      setLoading(true);

      const data = await tableApi.getAll();

      setTables(data);
    } catch (error) {
      console.error(
        "Failed to load dining tables",
        error
      );

      toast.error(
        "Failed to load dining tables"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  return {
    tables,
    loading,
    loadTables,
  };
}