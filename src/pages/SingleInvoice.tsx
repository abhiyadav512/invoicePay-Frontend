import { ArrowLeft, Download, Receipt } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useGetInvoiceById } from "../apis/invoices/useInvoices";
import { format } from "date-fns";
import { useEffect } from "react";
import { toast } from "sonner";

type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE";

const SingleInvoice = () => {
  const { invoiceId } = useParams();

  const {
    data: SingleInvoice,
    isLoading,
    error,
  } = useGetInvoiceById(invoiceId!);

  // console.log(SingleInvoice);

  const handleDownload = async () => {
    const pdfUrl = SingleInvoice?.data?.pdfUrl;
    if (!pdfUrl) {
      toast.error(
        "PDF nahi mila... Cloudinary bola: 'Bhaiya free plan khatam, ab premium lo!' 💸"
      );
      return;
    }

    try {
      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");

      // Convert to blob
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Invoice_${
        SingleInvoice?.data?.formattedInvoiceNumber || SingleInvoice?.data.id
      }.pdf`;
      link.style.display = "none";

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch {
      toast.error("Download failed:");
    }
  };
  const formatDate = (
    dateValue: string | Date | null | undefined,
    formatString = "MMM d, yyyy"
  ): string => {
    if (!dateValue) return "N/A";
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "Invalid Date";
      return format(date, formatString);
    } catch {
      return "Invalid Date";
    }
  };

  const getStatusStyles = (status: InvoiceStatus) => {
    switch (status) {
      case "PAID":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        };
      case "UNPAID":
        return {
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        };
      case "OVERDUE":
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        };
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="flex flex-col items-center space-y-8 text-center mt-40 ">
          <div className="relative">
            <Receipt
              className="text-primary w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                        animate-pulse drop-shadow-lg transform -rotate-12 transition-all duration-300"
            />
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Loading your workspace
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-xs xs:max-w-sm">
              Please wait while we prepare everything for you
            </p>
          </div>

          <div className="w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 h-2 xs:h-2.5 sm:h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full loading-animation shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !SingleInvoice?.data) {
    return (
      <main className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load invoice</p>
            <Link to="/invoices">
              <Button variant="outline">Back to Invoices</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const invoice = SingleInvoice.data;
  // console.log(invoice);
  const status = invoice.status as InvoiceStatus;
  const statusStyles = getStatusStyles(status);

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div>
        <header className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/invoices"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-0 h-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Invoices</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </header>

        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">
                      IP
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      InvoicePay
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Professional Invoicing Solution
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    INVOICE
                  </h2>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">
                      {invoice.formattedInvoiceNumber || "N/A"}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <Badge
                        variant={statusStyles.variant}
                        className={statusStyles.className}
                      >
                        {status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                  Bill From
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">
                    {invoice.business?.name || "N/A"}
                  </p>
                  <p>{invoice.business?.email || "N/A"}</p>
                  <p>
                    {invoice.business?.city ? `${invoice.business.city}, ` : ""}
                    {invoice.business?.state || ""}
                  </p>
                  <p>
                    {invoice.business?.country || ""}{" "}
                    {invoice.business?.postalCode || ""}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                  Bill To
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">
                    {invoice.clientName || "N/A"}
                  </p>
                  <p>{invoice.clientEmail || "N/A"}</p>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Issue Date
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Due Date
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Payment Status
                    </p>
                    <Badge
                      variant={statusStyles.variant}
                      className={`${statusStyles.className} text-sm font-semibold`}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Items
              </h3>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                            Description
                          </th>
                          <th className="text-center py-4 px-4 text-sm font-semibold text-foreground">
                            Qty
                          </th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {invoice.items?.length > 0 ? (
                          invoice.items.map((item, index) => (
                            <tr key={item.id || index}>
                              <td className="py-4 px-6 text-muted-foreground">
                                <div>
                                  <p className="font-medium text-foreground">
                                    {item.description || "N/A"}
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center text-muted-foreground">
                                {item.quantity || 1}
                              </td>
                              <td className="py-4 px-6 text-right font-medium text-foreground">
                                ₹{item.amount?.toFixed(2) || "0.00"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-8 text-center text-muted-foreground"
                            >
                              No items found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-4 border-t bg-muted/30">
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-semibold text-foreground">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-foreground">
                        ₹{invoice.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                    Payment Information
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <Badge
                        variant={statusStyles.variant}
                        className={statusStyles.className}
                      >
                        {status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium text-foreground">
                        ₹{invoice.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-medium text-foreground">
                        {invoice.paymentMethod || "Not specified"}
                      </span>
                    </div>
                    {status === "PAID" && invoice.paidDate && (
                      <div className="flex justify-between">
                        <span>Paid Date:</span>
                        <span className="font-medium text-foreground">
                          {formatDate(invoice.paidDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                    Notes
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      {invoice.notes ||
                        "Payment terms: Net 30 days. Late fees apply after due date."}
                    </p>
                    <p>
                      Thank you for your business! Please contact us if you have
                      any questions about this invoice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Generated by InvoicePay • For questions, contact
                support@invoicepay.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SingleInvoice;
