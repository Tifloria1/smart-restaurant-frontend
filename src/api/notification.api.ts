import { api } from "./axios";

export interface Notification {
  type: string;
  message: string;
}

export const notificationApi = {
  getAll: async () => {
    const response =
      await api.get<Notification[]>(
        "/notifications"
      );

    return response.data;
  },
};