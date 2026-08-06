import { RefreshCw } from "lucide-react";

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
          <button
            type="button"
            className="secondary-button"
            onClick={loadSettings}
            disabled={saving}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <RestaurantSettingsForm
        form={form}
        saving={saving}
        onUpdateField={updateField}
        onSubmit={saveSettings}
      />
    </div>
  );
}