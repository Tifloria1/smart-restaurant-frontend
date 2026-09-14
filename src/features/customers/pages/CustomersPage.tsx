import { useState } from "react";
import { toast } from "sonner";

import "../styles/customers.css";

import { CustomerFormModal } from "../components/CustomerFormModal";
import { EditCustomerModal } from "../components/EditCustomerModal";
import { CustomerTable } from "../components/CustomerTable";

import { useCustomers } from "../hooks/useCustomers";

import { customerApi } from "../../../api/customer.api";

import type {
  Customer,
} from "../../../types/customer";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function CustomersPage() {
  const {
    customers,
    loading,
    loadCustomers,
  } = useCustomers();

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const handleDelete = async (
  customer: Customer
) => {
  const confirmed = window.confirm(
    `Delete customer "${customer.fullName}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingId(customer.id);

    await customerApi.delete(customer.id);

    await loadCustomers();

    toast.success(
      "Customer deleted successfully"
    );
  } catch (error) {
    console.error(
      "Failed to delete customer",
      error
    );

    toast.error(
      "Failed to delete customer"
    );
  } finally {
    setDeletingId(null);
  }
};

  if (loading) {
    return (
      <PageLoader message="Loading customers..." />
    );
  }

  return (
    <div className="customers-page">
      <PageHeader
        title="Customers"
        description="Manage customer information and contact details."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setCreateModalOpen(true)
            }
          >
            Add Customer
          </button>
        }
      />

      <div className="panel">
        <CustomerTable
          customers={customers}
          onEdit={setEditingCustomer}
          onDelete={handleDelete}
        />
      </div>

      {createModalOpen && (
        <CustomerFormModal
          onClose={() =>
            setCreateModalOpen(false)
          }
          onCreated={loadCustomers}
        />
      )}

      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() =>
            setEditingCustomer(null)
          }
          onUpdated={loadCustomers}
        />
      )}

      {deletingId !== null && (
        <div className="customer-delete-progress">
          Deleting customer...
        </div>
      )}
    </div>
  );
}