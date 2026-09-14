import { useState } from "react";
import {
  Pencil,
  RefreshCw,
  X,
} from "lucide-react";

import "../styles/settings.css";

import { RestaurantSettingsForm } from "../components/RestaurantSettingsForm";
import { useRestaurantSettings } from "../hooks/useRestaurantSettings";

import { PageHeader } from "../../../shared/components/PageHeader";
import { PageLoader } from "../../../shared/components/PageLoader";

export function SettingsPage() {
  const {
    form,
    loading,
    saving,

    loadSettings,
    updateField,
    saveSettings,
  } = useRestaurantSettings();

  const [editing, setEditing] = useState(false);

  const handleCancelEdit = async () => {
    await loadSettings();
    setEditing(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    await saveSettings(event);
    setEditing(false);
  };

  if (loading) {
    return (
      <PageLoader message="Loading settings..." />
    );
  }

  return (
    <div className="settings-page">
      <PageHeader
        title="Restaurant Settings"
        description="Configure your restaurant identity and business information."
        actions={
          <div className="settings-header-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={loadSettings}
              disabled={saving}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            {!editing ? (
              <button
                type="button"
                className="primary-button"
                onClick={() => setEditing(true)}
              >
                <Pencil size={16} />
                Edit Settings
              </button>
            ) : (
              <button
                type="button"
                className="secondary-button"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>
        }
      />

      <RestaurantSettingsForm
        form={form}
        saving={saving}
        editing={editing}
        onUpdateField={updateField}
        onSubmit={handleSubmit}
      />
    </div>
  );
}