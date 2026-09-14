import { Settings } from "lucide-react";

import type {
  UpdateRestaurantSettingsRequest,
} from "../../../types/settings";

interface RestaurantSettingsFormProps {
  form: UpdateRestaurantSettingsRequest;
  saving: boolean;
  editing: boolean;

  onUpdateField: (
    field: keyof UpdateRestaurantSettingsRequest,
    value: string
  ) => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}

export function RestaurantSettingsForm({
  form,
  saving,
  editing,
  onUpdateField,
  onSubmit,
}: RestaurantSettingsFormProps) {
  if (!editing) {
    return (
      <section className="panel settings-details-card">
        <div className="settings-details-grid">
          <div className="settings-detail-item">
            <span>Restaurant Name</span>
            <strong>{form.restaurantName || "-"}</strong>
          </div>

          <div className="settings-detail-item">
            <span>Address</span>
            <strong>{form.address || "-"}</strong>
          </div>

          <div className="settings-detail-item">
            <span>Phone</span>
            <strong>{form.phone || "-"}</strong>
          </div>

          <div className="settings-detail-item">
            <span>Email</span>
            <strong>{form.email || "-"}</strong>
          </div>

          <div className="settings-detail-item">
            <span>Tax Number</span>
            <strong>{form.taxNumber || "-"}</strong>
          </div>

          <div className="settings-detail-item">
            <span>Currency</span>
            <strong>{form.currency || "-"}</strong>
          </div>

          <div className="settings-detail-item settings-detail-item--full">
            <span>Logo URL</span>
            <strong>{form.logoUrl || "-"}</strong>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form
      className="panel restaurant-settings-form"
      onSubmit={onSubmit}
    >
      <label>
        Restaurant Name

        <input
          required
          value={form.restaurantName}
          onChange={(event) =>
            onUpdateField(
              "restaurantName",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Address

        <input
          value={form.address}
          onChange={(event) =>
            onUpdateField(
              "address",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Phone

        <input
          type="tel"
          value={form.phone}
          onChange={(event) =>
            onUpdateField(
              "phone",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Email

        <input
          type="email"
          value={form.email}
          onChange={(event) =>
            onUpdateField(
              "email",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Tax Number

        <input
          value={form.taxNumber}
          onChange={(event) =>
            onUpdateField(
              "taxNumber",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Currency

        <input
          required
          value={form.currency}
          onChange={(event) =>
            onUpdateField(
              "currency",
              event.target.value
            )
          }
        />
      </label>

      <label className="restaurant-settings-form__full-width">
        Logo URL

        <input
          type="url"
          value={form.logoUrl}
          placeholder="https://example.com/logo.png"
          onChange={(event) =>
            onUpdateField(
              "logoUrl",
              event.target.value
            )
          }
        />
      </label>

      <div className="restaurant-settings-form__actions">
        <button
          type="submit"
          className="primary-button"
          disabled={saving}
        >
          <Settings size={16} />

          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>
    </form>
  );
}