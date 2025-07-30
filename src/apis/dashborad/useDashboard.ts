import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary, getRecentInvoice } from "./dashboardApi";

export const useGetDashboardSummary = (month: number, day?: number) => {
  return useQuery({
    queryKey: day
      ? ["DashboardSummary", month, day]
      : ["DashboardSummary", month],
    queryFn: () => getDashboardSummary(month, day),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useGetRecentInoivce = () => {
  return useQuery({
    queryKey: ["RecentInoivces"],
    queryFn: getRecentInvoice,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
