import { useEffect, useState } from "react";
import { toast } from "sonner";

import { settingsApi } from "../../../api/settings.api";

import type {
  UpdateRestaurantSettingsRequest,
} from "../../../types/settings";

const initialSettings: UpdateRestaurantSettingsRequest = {
  restaurantName: "",
  address: "",
  phone: "",
  email: "",
  taxNumber: "",
  currency: "MAD",
  logoUrl: "",
};

export function useRestaurantSettings() {
  const [form, setForm] =
    useState<UpdateRestaurantSettingsRequest>(
      initialSettings
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const data = await settingsApi.get();

      setForm({
        restaurantName:
          data.restaurantName ?? "",
        address:
          data.address ?? "",
        phone:
          data.phone ?? "",
        email:
          data.email ?? "",
        taxNumber:
          data.taxNumber ?? "",
        currency:
          data.currency ?? "MAD",
        logoUrl:
          data.logoUrl ?? "",
      });
    } catch (error) {
      console.error(
        "Failed to load restaurant settings",
        error
      );

      toast.error(
        "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateField = (
    field: keyof UpdateRestaurantSettingsRequest,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const saveSettings = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);

      const updated =
        await settingsApi.update(form);

      setForm({
        restaurantName:
          updated.restaurantName ?? "",
        address:
          updated.address ?? "",
        phone:
          updated.phone ?? "",
        email:
          updated.email ?? "",
        taxNumber:
          updated.taxNumber ?? "",
        currency:
          updated.currency ?? "MAD",
        logoUrl:
          updated.logoUrl ?? "",
      });

      toast.success(
        "Settings updated successfully"
      );
    } catch (error) {
      console.error(
        "Failed to save restaurant settings",
        error
      );

      toast.error(
        "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    form,
    loading,
    saving,

    loadSettings,
    updateField,
    saveSettings,
  };
}