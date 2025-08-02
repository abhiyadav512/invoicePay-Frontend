import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import { FilterPopover } from "../components/invoices/FilterPopover";
import InvoiceCardSkeleton from "../components/invoices/skeleton/InvoiceCardSkeleton";
import {
  useGetAlInvoices,
  useGetInvoiceByStatus,
} from "../apis/invoices/useInvoices";
import type { Invoice } from "../apis/invoices/invoiceType";
import { InvoiceCard } from "../components/invoices/InvoiceCard";
import { Pagination } from "../components/invoices/Pagination";
import { useAuth } from "../components/contexts/authContexts";
import { Link } from "react-router-dom";

const Invoices = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const { user } = useAuth();

  const {
    data: resInvoiceData,
    isPending: isInvoiceDataLoading,
    error: invoiceDataError,
    isError: isErrorInvoiceData,
    refetch,
    isFetching,
  } = useGetAlInvoices(currentPage, limit) as {
    data?: {
      data?: {
        data?: Invoice[];
        pagination?: {
          totalPages?: number;
          total?: number;
        };
      };
    };
    isPending: boolean;
    error: unknown;
    isError: boolean;
    refetch: () => void;
    isFetching: boolean;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const userId = user?.id;
  const { data: DataByStatus } = useGetInvoiceByStatus(filter ?? "", userId!);

  // Add safety checks and ensure arrays are properly handled
  const invoiceData: Invoice[] = Array.isArray(resInvoiceData?.data?.data)
    ? resInvoiceData.data.data
    : [];
  const totalPages = resInvoiceData?.data?.pagination?.totalPages ?? 1;
  const totalItems = resInvoiceData?.data?.pagination?.total ?? 0;

  // Improved filtered invoices logic with better safety checks
  const filteredInvoices = (() => {
    if (!filter) return invoiceData;

    // Handle DataByStatus safely
    if (DataByStatus?.data) {
      if (Array.isArray(DataByStatus.data)) {
        return DataByStatus.data;
      }
      if (Array.isArray(DataByStatus.data.data)) {
        return DataByStatus.data.data;
      }
    }

    return [];
  })();

  const handleRefresh = () => {
    try {
      refetch();
    } catch (error) {
      console.error("Error refreshing invoices:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Add error boundary-like error handling
  if (isErrorInvoiceData && invoiceDataError) {
    console.error("Invoice data error:", invoiceDataError);
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 lg:px-6 md:px-2 mt-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Invoices</h1>
          <p className="text-sm text-gray-500">
            Manage all your invoices in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isInvoiceDataLoading || isFetching}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Link to={"/invoice/create"}>
            <Button
              className="flex cursor-pointer items-center gap-2"
              aria-label="Create a new invoice"
            >
              <PlusCircle size={18} />
              Create Invoice
            </Button>
          </Link>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center px-1 md:px-6">
          <h1>
            All Invoices{" "}
            <span>{filter ? filteredInvoices.length : totalItems}</span>
          </h1>
          <FilterPopover selectedFilter={filter} onChange={setFilter} />
        </div>

        <div className="py-4 md:px-4 space-y-4 min-h-[400px]">
          {isInvoiceDataLoading && currentPage === 1 ? (
            <>
              {Array.from({ length: limit }).map((_, i) => (
                <InvoiceCardSkeleton key={i} />
              ))}
            </>
          ) : isErrorInvoiceData ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-lg p-6 max-w-md">
                <h3 className=" text-red-600  text-lg font-semibold mb-2">
                  Failed to load invoices
                </h3>
                <p className="text-sm mb-4 text-red-600 ">
                  {(() => {
                    if (
                      invoiceDataError &&
                      typeof invoiceDataError === "object" &&
                      "response" in invoiceDataError &&
                      (invoiceDataError as any).response?.data?.message
                    ) {
                      return (invoiceDataError as any).response?.data?.message;
                    }
                    return "Something went wrong while loading your invoices.";
                  })()}
                </p>
                <Link to={"/setting/business"}>
                  <Button variant="outline" size="sm">
                    Create Business
                  </Button>
                </Link>
              </div>
            </div>
          ) : !Array.isArray(filteredInvoices) ||
            filteredInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-muted-foreground">
                <h3 className="text-lg font-semibold mb-2">
                  {filter
                    ? "No invoices match your filters"
                    : "No invoices yet"}
                </h3>
                <p className="text-sm mb-4">
                  {filter
                    ? "Try adjusting your filters or create a new invoice."
                    : "Create your first invoice to get started."}
                </p>
                {filter ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilter(null)}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Link to={"/invoice/create"}>
                    <Button
                      size="sm"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle size={16} />
                      Create Your First Invoice
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              {isFetching && currentPage > 1 && (
                <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
                  <div className="bg-card border rounded-lg p-4 flex items-center gap-2 shadow-lg">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                </div>
              )}

              {/* Add safety check before mapping */}
              {Array.isArray(filteredInvoices) &&
                filteredInvoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} {...invoice} />
                ))}
            </div>
          )}
        </div>

        {!isErrorInvoiceData &&
          Array.isArray(filteredInvoices) &&
          filteredInvoices.length > 0 &&
          !filter && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isInvoiceDataLoading || isFetching}
              totalItems={totalItems}
              itemsPerPage={limit}
            />
          )}

        {filter &&
          Array.isArray(filteredInvoices) &&
          filteredInvoices.length > 0 && (
            <div className="flex justify-center py-4">
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
                Showing {filteredInvoices.length} filtered result
                {filteredInvoices.length !== 1 ? "s" : ""} from {totalItems}{" "}
                total invoice{totalItems !== 1 ? "s" : ""}
              </div>
            </div>
          )}
      </section>
    </div>
  );
};

export default Invoices;
