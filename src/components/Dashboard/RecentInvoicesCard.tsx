import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import InvoiceCardSkeleton from "./skeleton/InvoiceCardSkeleton";
import { useGetRecentInoivce } from "../../apis/dashborad/useDashboard";

const RecentInvoicesCard = () => {
  const {
    data: recentInvoices,
    isPending: recentInvoicePending,
    error: recentInvoiceError,
    isError: isRecentInvoiceError,
  } = useGetRecentInoivce();

  const invoices = recentInvoices?.data;

  return (
    <div className="shadow-md  rounded-lg flex flex-col gap-4  ">
      {isRecentInvoiceError ? (
        <div className="text-red-600 text-center py-2">
          Error loading recent invoices:{" "}
          {(recentInvoiceError as Error)?.message || "Unknown error"}
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {recentInvoicePending || !invoices ? (
              Array.from({ length: 4 }).map((_, i) => (
                <InvoiceCardSkeleton key={i} />
              ))
            ) : invoices?.length === 0 ? (
              <p className="text-center text-gray-500">No recent invoices.</p>
            ) : (
              invoices.map((invoice) => (
                <li
                  key={invoice.id}
                  className="border p-4 rounded-lg  transition hover:bg-accent hover:text-accent-foreground"
                >
                  <Link to={`/invoice/${invoice?.id}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{invoice?.clientName}</h3>
                        <p className="text-sm text-gray-600">
                          {invoice?.clientEmail}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-xl 
                        ${
                          invoice?.status === "PAID"
                            ? "bg-green-600 drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]"
                            : "bg-red-600 drop-shadow-[0_0_4px_rgba(220,38,38,0.4)]"
                        }`}
                      >
                        {invoice?.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">
                        ₹{invoice?.total.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(invoice?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className="flex justify-center">
            <Button variant="outline" className="mt-4" disabled={!invoices}>
              {invoices ? (
                <Link to="/invoices">View All Invoices ...</Link>
              ) : (
                <span>Loading...</span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentInvoicesCard;
