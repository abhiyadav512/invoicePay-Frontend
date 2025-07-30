import React, { useState, useEffect } from "react";
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
import { Pagination } from "../components/invoices/pagination";
import { useAuth } from "../components/contexts/authContexts";

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
  } = useGetAlInvoices(currentPage, limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const userId = user?.id;
  const { data: DataByStatus } = useGetInvoiceByStatus(filter ?? "", userId!);

  const invoiceData: Invoice[] = resInvoiceData?.data?.data ?? [];
  const totalPages = resInvoiceData?.data?.pagination?.totalPages ?? 1;
  const totalItems = resInvoiceData?.data?.pagination?.total ?? 0;

  const filteredInvoices = filter ? DataByStatus?.data ?? [] : invoiceData;

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            className="flex items-center gap-2"
            aria-label="Create a new invoice"
          >
            <PlusCircle size={18} />
            Create Invoice
          </Button>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center px-1 md:px-6">
          <h1>
            All Invoices <span>{DataByStatus?.data?.length ?? totalItems}</span>
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
              <div className="text-red-600 bg-red-50 rounded-lg p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-2">
                  Failed to load invoices
                </h3>
                <p className="text-sm mb-4">
                  {(invoiceDataError as Error)?.message ||
                    "Something went wrong while loading your invoices."}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : filteredInvoices.length === 0 ? (
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
                  <Button size="sm" className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Create Your First Invoice
                  </Button>
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

              {filteredInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} {...invoice} />
              ))}
            </div>
          )}
        </div>

        {!isErrorInvoiceData && filteredInvoices.length > 0 && !filter && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isInvoiceDataLoading || isFetching}
            totalItems={totalItems}
            itemsPerPage={limit}
          />
        )}

        {filter && filteredInvoices.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
              Showing {filteredInvoices.length} filtered result
              {filteredInvoices.length !== 1 ? "s" : ""} from {totalItems} total
              invoice{totalItems !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Invoices;
