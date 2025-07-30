import React, { Suspense, useEffect, useState } from "react";
import {
  CalendarIcon,
  CheckCircle,
  FileText,
  Hourglass,
  Wallet,
  Calendar as CalendarViewIcon,
  BarChart3,
} from "lucide-react";
import { format } from "date-fns";
import SummaryCardSkeleton from "../components/Dashboard/skeleton/SummaryCardSkeleton";
import RecentInvoicesCard from "../components/Dashboard/RecentInvoicesCard";
import { useGetDashboardSummary } from "../apis/dashborad/useDashboard";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";

const SummaryCard = React.lazy(
  () => import("../components/Dashboard/SummaryCard")
);

type ViewMode = "month" | "day";

const DashBoard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  const {
    data: summaryData,
    isPending: summaryPending,
    error: summaryError,
    isError: isSummaryError,
  } = useGetDashboardSummary(month, viewMode === "day" ? day : undefined);

  const getDisplayText = () => {
    if (viewMode === "month") {
      return format(selectedDate, "MMMM yyyy");
    }
    return format(selectedDate, "PPP");
  };

  const getFilterLabel = () => {
    return viewMode === "month" ? "Filter by Month:" : "Filter by Date:";
  };

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="min-h-screen">
      <section className="flex flex-col p-4">
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-4 text-sm pb-4 lg:px-6 md:px-2 gap-4">
          <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">View:</span>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) =>
                  value && setViewMode(value as ViewMode)
                }
                className="border rounded-lg p-1"
              >
                <ToggleGroupItem
                  value="month"
                  className="flex items-center gap-1 text-xs"
                >
                  <BarChart3 size={14} />
                  month
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="day"
                  className="flex items-center gap-1 text-xs"
                >
                  <CalendarViewIcon size={14} />
                  day
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">{getFilterLabel()}</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getDisplayText()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) setSelectedDate(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        {isSummaryError ? (
          <div className="text-red-600 text-center py-4">
            Error fetching dashboard data:{" "}
            {(summaryError as Error)?.message ?? "Unknown error"}
          </div>
        ) : (
          <div className="w-full md:px-2 lg:px-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {viewMode === "month" ? "month Summary" : "day Summary"}
              </span>
              <span className="text-gray-400">•</span>
              <span>{getDisplayText()}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {summaryPending || !summaryData?.data ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <SummaryCardSkeleton key={i} />
                ))
              ) : (
                <>
                  <Suspense fallback={<SummaryCardSkeleton />}>
                    <SummaryCard
                      title="Total Revenue"
                      value={`₹${summaryData.data.totalRevenue}`}
                      icon={
                        <span className="drop-shadow-[0_0_6px_rgba(0,200,140,0.4)]">
                          <Wallet size={22} className="text-chart-1" />
                        </span>
                      }
                    />
                  </Suspense>

                  <Suspense fallback={<SummaryCardSkeleton />}>
                    <SummaryCard
                      title="Total Invoices"
                      value={summaryData.data.totalInvoices}
                      icon={
                        <span className="drop-shadow-[0_0_6px_rgba(120,100,255,0.4)]">
                          <FileText size={22} className="text-chart-4" />
                        </span>
                      }
                    />
                  </Suspense>

                  <Suspense fallback={<SummaryCardSkeleton />}>
                    <SummaryCard
                      title="Total Paid"
                      value={`₹${summaryData.data.paid}`}
                      icon={
                        <span className="drop-shadow-[0_0_6px_rgba(0,200,140,0.4)]">
                          <CheckCircle size={22} className="text-chart-2" />
                        </span>
                      }
                    />
                  </Suspense>

                  <Suspense fallback={<SummaryCardSkeleton />}>
                    <SummaryCard
                      title="Total Unpaid"
                      value={`₹${summaryData.data.unpaid}`}
                      icon={
                        <span className="drop-shadow-[0_0_6px_rgba(255,140,0,0.4)]">
                          <Hourglass size={22} className="text-chart-5" />
                        </span>
                      }
                    />
                  </Suspense>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="pt-4 px-4 mb-6 lg:px-10 md:px-2">
        <h1 className="font-bold text-2xl pb-4">Recent invoices</h1>
        <RecentInvoicesCard />
      </section>
    </div>
  );
};

export default DashBoard;
