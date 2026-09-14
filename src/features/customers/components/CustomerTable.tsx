import {
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import type {
  Customer,
} from "../../../types/customer";

import { EmptyState } from "../../../shared/components/EmptyState";
import { StatusBadge } from "../../../shared/components/StatusBadge";

interface CustomerTableProps {
  customers: Customer[];

  onEdit: (
    customer: Customer
  ) => void;

  onDelete: (
    customer: Customer
  ) => void;
}

export function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <EmptyState
        title="No customers found"
        description="Customer records will appear here."
        icon={<Users size={22} />}
      />
    );
  }

  return (
    <div className="customers-table-wrapper">
      <table className="data-table customers-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="table-main-cell">
                  <div className="mini-icon">
                    <Users size={18} />
                  </div>

                  <div>
                    <strong>
                      {customer.fullName}
                    </strong>
                  </div>
                </div>
              </td>

              <td>
                {customer.phone || "-"}
              </td>

              <td>
                {customer.email || "-"}
              </td>

              <td>
                {customer.address || "-"}
              </td>

              <td>
                <StatusBadge
                  variant={
                    customer.active
                      ? "success"
                      : "danger"
                  }
                >
                  {customer.active
                    ? "Active"
                    : "Inactive"}
                </StatusBadge>
              </td>

              <td>
                <div className="customer-row-actions">
                  <button
                    type="button"
                    className="customer-icon-button"
                    title="Edit customer"
                    aria-label={`Edit ${customer.fullName}`}
                    onClick={() =>
                      onEdit(customer)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    className="customer-icon-button customer-delete-button"
                    title="Delete customer"
                    aria-label={`Delete ${customer.fullName}`}
                    onClick={() =>
                      onDelete(customer)
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