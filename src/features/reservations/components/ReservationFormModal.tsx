import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

import { BaseModal } from "../../../shared/components/BaseModal";

import { reservationApi } from "../../../api/reservation.api";
import {
  customerApi,
  type CreateCustomerRequest,
} from "../../../api/customer.api";
import { tableApi } from "../../../api/table.api";

import type { Customer } from "../../../types/customer";
import type { DiningTable } from "../../../types/table";
import type { CreateReservationRequest } from "../../../types/reservation";

interface ReservationFormModalProps {
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const EMPTY_CUSTOMER_FORM: CreateCustomerRequest = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
};

export function ReservationFormModal({
  onClose,
  onSuccess,
}: ReservationFormModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tables, setTables] = useState<DiningTable[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showNewCustomer, setShowNewCustomer] =
    useState(false);

  const [savingCustomer, setSavingCustomer] =
    useState(false);

  const [newCustomer, setNewCustomer] =
    useState<CreateCustomerRequest>({
      ...EMPTY_CUSTOMER_FORM,
    });

  const [form, setForm] =
    useState<CreateReservationRequest>({
      customerId: 0,
      diningTableId: 0,
      reservationDateTime: "",
      numberOfGuests: 2,
      notes: "",
    });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoadingData(true);

        const [customerData, tableData] =
          await Promise.all([
            customerApi.getAll(),
            tableApi.getAll(),
          ]);

        const activeCustomers = customerData.filter(
          (customer) => customer.active
        );

        setCustomers(activeCustomers);
        setTables(tableData);

        setForm((current) => ({
          ...current,
          customerId:
            activeCustomers[0]?.id ?? 0,
          diningTableId:
            tableData[0]?.id ?? 0,
        }));
      } catch (error) {
        console.error(
          "Failed to load reservation form data",
          error
        );

        toast.error(
          "Failed to load customers or tables"
        );
      } finally {
        setLoadingData(false);
      }
    };

    void loadFormData();
  }, []);

  const handleNewCustomerChange = (
    field: keyof CreateCustomerRequest,
    value: string
  ) => {
    setNewCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCancelNewCustomer = () => {
    if (savingCustomer) {
      return;
    }

    setShowNewCustomer(false);
    setNewCustomer({
      ...EMPTY_CUSTOMER_FORM,
    });
  };

  const handleCreateCustomer = async () => {
    if (!newCustomer.fullName.trim()) {
      toast.error("Customer name is required");
      return;
    }

    try {
      setSavingCustomer(true);

      const createdCustomer =
        await customerApi.create({
          fullName: newCustomer.fullName.trim(),
          phone: newCustomer.phone.trim(),
          email: newCustomer.email.trim(),
          address: newCustomer.address.trim(),
        });

      setCustomers((current) => [
        ...current,
        createdCustomer,
      ]);

      setForm((current) => ({
        ...current,
        customerId: createdCustomer.id,
      }));

      setNewCustomer({
        ...EMPTY_CUSTOMER_FORM,
      });

      setShowNewCustomer(false);

      toast.success(
        "Customer created and selected"
      );
    } catch (error) {
      console.error(
        "Failed to create customer",
        error
      );

      toast.error("Failed to create customer");
    } finally {
      setSavingCustomer(false);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.customerId) {
      toast.error("Please select a customer");
      return;
    }

    if (!form.diningTableId) {
      toast.error("Please select a dining table");
      return;
    }

    if (!form.reservationDateTime) {
      toast.error(
        "Reservation date and time are required"
      );
      return;
    }

    if (form.numberOfGuests < 1) {
      toast.error(
        "Number of guests must be at least 1"
      );
      return;
    }

    try {
      setSaving(true);

      await reservationApi.create(form);

      toast.success(
        "Reservation created successfully"
      );

      await onSuccess();

      onClose();
    } catch (error) {
      console.error(
        "Failed to create reservation",
        error
      );

      toast.error(
        "Failed to create reservation"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseModal
      title="Add Reservation"
      description="Create a table reservation for a customer."
      onClose={onClose}
      size="medium"
      footer={
        <>
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={saving || savingCustomer}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="reservation-form"
            className="primary-button"
            disabled={
              saving ||
              savingCustomer ||
              loadingData
            }
          >
            {saving
              ? "Creating..."
              : "Create Reservation"}
          </button>
        </>
      }
    >
      {loadingData ? (
        <p className="muted">
          Loading customers and tables...
        </p>
      ) : (
        <form
          id="reservation-form"
          className="reservation-form"
          onSubmit={handleSubmit}
        >
          <div className="reservation-form__field reservation-form__field--full">
            <div className="reservation-customer-header">
              <label htmlFor="reservation-customer">
                Customer
              </label>

              {!showNewCustomer && (
                <button
                  type="button"
                  className="reservation-add-customer-button"
                  onClick={() =>
                    setShowNewCustomer(true)
                  }
                >
                  <Plus size={15} />
                  New Customer
                </button>
              )}
            </div>

            <select
              id="reservation-customer"
              value={form.customerId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  customerId: Number(
                    event.target.value
                  ),
                }))
              }
              disabled={savingCustomer}
            >
              {customers.length === 0 && (
                <option value={0}>
                  No active customers
                </option>
              )}

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.fullName}
                </option>
              ))}
            </select>

            {showNewCustomer && (
              <div className="reservation-new-customer">
                <div className="reservation-new-customer__header">
                  <div>
                    <strong>New Customer</strong>
                    <p>
                      Create the customer without
                      leaving the reservation.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="reservation-new-customer__close"
                    onClick={
                      handleCancelNewCustomer
                    }
                    disabled={savingCustomer}
                    aria-label="Close new customer form"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="reservation-new-customer__grid">
  <div className="reservation-form__field reservation-form__field--full">
    <label htmlFor="new-customer-name">
      Full Name *
    </label>

    <input
      id="new-customer-name"
      type="text"
      value={newCustomer.fullName}
      placeholder="Customer name"
      onChange={(event) =>
        handleNewCustomerChange(
          "fullName",
          event.target.value
        )
      }
      disabled={savingCustomer}
    />
  </div>

  <div className="reservation-form__field">
    <label htmlFor="new-customer-phone">
      Phone
    </label>

    <input
      id="new-customer-phone"
      type="tel"
      value={newCustomer.phone}
      placeholder="Phone number"
      onChange={(event) =>
        handleNewCustomerChange(
          "phone",
          event.target.value
        )
      }
      disabled={savingCustomer}
    />
  </div>

  <div className="reservation-form__field">
    <label htmlFor="new-customer-email">
      Email
    </label>

    <input
      id="new-customer-email"
      type="email"
      value={newCustomer.email}
      placeholder="Email address"
      onChange={(event) =>
        handleNewCustomerChange(
          "email",
          event.target.value
        )
      }
      disabled={savingCustomer}
    />
  </div>

  <div className="reservation-form__field reservation-form__field--full">
    <label htmlFor="new-customer-address">
      Address
    </label>

    <input
      id="new-customer-address"
      type="text"
      value={newCustomer.address}
      placeholder="Customer address"
      onChange={(event) =>
        handleNewCustomerChange(
          "address",
          event.target.value
        )
      }
      disabled={savingCustomer}
    />
  </div>
</div>

                <div className="reservation-new-customer__actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={
                      handleCancelNewCustomer
                    }
                    disabled={savingCustomer}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      void handleCreateCustomer()
                    }
                    disabled={savingCustomer}
                  >
                    {savingCustomer
                      ? "Saving..."
                      : "Save Customer"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="reservation-form__field">
            <label htmlFor="reservation-table">
              Dining Table
            </label>

            <select
              id="reservation-table"
              value={form.diningTableId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  diningTableId: Number(
                    event.target.value
                  ),
                }))
              }
            >
              {tables.length === 0 && (
                <option value={0}>
                  No tables available
                </option>
              )}

              {tables.map((table) => (
                <option
                  key={table.id}
                  value={table.id}
                >
                  Table {table.tableNumber}
                  {" — "}
                  {table.capacity} seats
                </option>
              ))}
            </select>
          </div>

          <div className="reservation-form__field">
            <label htmlFor="reservation-guests">
              Number of Guests
            </label>

            <input
              id="reservation-guests"
              type="number"
              min="1"
              value={form.numberOfGuests}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  numberOfGuests: Number(
                    event.target.value
                  ),
                }))
              }
            />
          </div>

          <div className="reservation-form__field reservation-form__field--full">
            <label htmlFor="reservation-date">
              Date & Time
            </label>

            <input
              id="reservation-date"
              type="datetime-local"
              value={form.reservationDateTime}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  reservationDateTime:
                    event.target.value,
                }))
              }
            />
          </div>

          <div className="reservation-form__field reservation-form__field--full">
            <label htmlFor="reservation-notes">
              Notes
            </label>

            <textarea
              id="reservation-notes"
              value={form.notes}
              placeholder="Optional notes..."
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
            />
          </div>
        </form>
      )}
    </BaseModal>
  );
}