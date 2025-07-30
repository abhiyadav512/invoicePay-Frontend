export interface DashBoardSummaryResponse {
  success: boolean;
  message: string;
  data: {
    totalRevenue: number | 0;
    totalInvoices: number | 0;
    paid: number | 0;
    unpaid: number | 0;
  };
}

export interface RecentInvoicesResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    clientName: string;
    clientEmail: string;
    total: number;
    status: "PAID" | "UNPAID" | "OVERDUE" | "FAILED";
    createdAt: string;
  };
}
