import { api } from "./axios";
import type { SalesReport } from "../types/report";

export const reportApi = {
  getSalesReport: async (
    startDate: string,
    endDate: string
  ): Promise<SalesReport> => {
    const response = await api.get<SalesReport>(
      `/reports/sales?startDate=${startDate}&endDate=${endDate}`
    );

    return response.data;
  },
};