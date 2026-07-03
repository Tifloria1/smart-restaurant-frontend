import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { customerApi } from "../../api/customer.api";
import type { Customer } from "../../types/customer";

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    customerApi.getAll().then(setCustomers);
  }, []);

  return (
    <div>
      <div className="page-header row-between">
        <div>
          <h2>Customers</h2>
          <p>Manage customer information and contact details.</p>
        </div>
        <button className="primary-button">Add Customer</button>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
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
                      <strong>{customer.fullName}</strong>
                    </div>
                  </div>
                </td>
                <td>{customer.phone || "-"}</td>
                <td>{customer.email || "-"}</td>
                <td>{customer.address || "-"}</td>
                <td>
                  <span className={customer.active ? "status success" : "status danger"}>
                    {customer.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {customers.length === 0 && <p className="muted">No customers found.</p>}
      </div>
    </div>
  );
}