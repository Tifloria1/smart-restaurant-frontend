import { api } from "./axios";
import type {
  RestaurantSettings,
  UpdateRestaurantSettingsRequest,
} from "../types/settings";

export const settingsApi = {
  get: async (): Promise<RestaurantSettings> => {
    const response = await api.get<RestaurantSettings>("/settings");
    return response.data;
  },

  update: async (
    request: UpdateRestaurantSettingsRequest
  ): Promise<RestaurantSettings> => {
    const response = await api.put<RestaurantSettings>("/settings", request);
    return response.data;
  },
};