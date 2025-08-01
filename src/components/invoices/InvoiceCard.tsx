import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Invoice } from "../../apis/invoices/invoiceType";
import { format } from "date-fns";
import { useDeleteInvoice } from "../../apis/invoices/useInvoices";
import { toast } from "sonner";

export const InvoiceCard = ({
  id,
  clientName,
  clientEmail,
  total,
  status,
  dueDate,
  formattedInvoiceNumber,
}: Invoice) => {
  const navigate = useNavigate();

  const formatted = format(dueDate, "yyyy-MM-dd");

  const { mutate: deleteInvoice, isPending } = useDeleteInvoice();

  const handleDelete = (invoiceId: string) => {
    deleteInvoice(invoiceId, {
      onSuccess: () => {
        toast.success("Invoice deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete invoice. Please try again.");
      },
    });
  };


  return (
    <>
      <div className="relative w-full border rounded-xl p-3  sm:p-4 transition-all">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal
              size={20}
              className="absolute top-4 right-4 cursor-pointer text-muted-foreground hover:text-primary "
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => navigate(`/invoice/${id}`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(String(id))}
              className={`text-red-600 ${
                isPending ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {isPending ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 mb-4">
          <Badge
            className={`text-white ${
              status === "PAID"
                ? "status-paid"
                : status === "UNPAID"
                ? "status-unpaid"
                : "status-overdue"
            }`}
          >
            {status.toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">{formatted}</span>
        </div>

        <Link
          to={`/invoice/${id}`}
          className="flex flex-row justify-between items-center  gap-3"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium text-blue-600">
              {formattedInvoiceNumber}
            </span>
            <span className="font-semibold">{clientName}</span>
            <span className="text-sm text-muted-foreground">{clientEmail}</span>
          </div>
          <div className="text-lg font-bold">₹{total}</div>
        </Link>
      </div>
    </>
  );
};
