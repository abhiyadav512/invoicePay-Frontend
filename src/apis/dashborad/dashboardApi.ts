import { axiosInstance } from "../../lib/axiosInstance";
import type {
  DashBoardSummaryResponse,
  RecentInvoicesResponse,
} from "./dashboardType";

export const getDashboardSummary = async (
  month: number,
  day?: number
): Promise<DashBoardSummaryResponse> => {
  const url = day
    ? `/dashboard/summary/data?month=${month}&day=${day}`
    : `/dashboard/summary/data?month=${month}`;

  const response = await axiosInstance.get(url);
  return response.data;
};

export const getRecentInvoice = async (): Promise<RecentInvoicesResponse> => {
  const response = await axiosInstance.get("/dashboard/recent/data");
  return response.data;
};
