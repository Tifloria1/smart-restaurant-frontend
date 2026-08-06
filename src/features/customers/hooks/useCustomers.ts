import { useEffect, useState } from "react";
import { toast } from "sonner";

import { customerApi } from "../../../api/customer.api";

import type { Customer } from "../../../types/customer";

export function useCustomers() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await customerApi.getAll();

      setCustomers(data);
    } catch (error) {
      console.error(
        "Failed to load customers",
        error
      );

      toast.error(
        "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers,
    loading,
    loadCustomers,
  };
}