import { useState } from "react";

import "../styles/customers.css";

import { CustomerFormModal } from "../components/CustomerFormModal";
import { CustomerTable } from "../components/CustomerTable";
import { useCustomers } from "../hooks/useCustomers";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function CustomersPage() {
  const {
    customers,
    loading,
  } = useCustomers();

  const [modalOpen, setModalOpen] =
    useState(false);

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
            onClick={() => setModalOpen(true)}
          >
            Add Customer
          </button>
        }
      />

      <div className="panel">
        <CustomerTable customers={customers} />
      </div>

      {modalOpen && (
        <CustomerFormModal
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}