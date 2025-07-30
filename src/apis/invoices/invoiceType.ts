export type InvoiceItem = {
  id: number;
  description: string;
  amount: number;
};

export type BusinessInfo = {
  id: string;
  name: string;
  email: string;
};

export type Invoice = {
  id: number;
  invoiceNumber: number;
  formattedInvoiceNumber: string;
  clientName: string;
  clientEmail: string;
  currency: string;
  total: number;
  status: "PAID" | "UNPAID" | "OVERDUE" | "FAILED";
  dueDate: string;
  pdfUrl: string | null;
  paymentLink: string;
  createdAt: string;
  business: BusinessInfo;
  items: InvoiceItem[];
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type InvoiceResponse = {
  success: boolean;
  message: string;
  data: {
    data: Invoice[] | [];
    pagination: Pagination;
  };
};

export interface SingleInvoiceResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    invoiceNumber: number;
    formattedInvoiceNumber: string;
    clientName: string;
    clientEmail: string;
    currency: string;
    total: number;
    status: "PAID" | "UNPAID" | "OVERDUE" | "FAILED";
    dueDate: string;
    pdfUrl: string | null;
    paymentLink: string;
    business: {
      id: string;
      name: string;
      email: string;
      address: string;
      city: string;
      country: string;
      logo: string;
      state: string;
      postalCode: string;
      owner: {
        id: string;
        name: string;
        email: string;
        password: string;
        dob: string;
        location: string;
        number: string;
        isVerified: boolean;
        resetToken: string | null;
        resetTokenExpires: string | null;
        createdAt: string;
        updatedAt: string;
      };
    };
    items: {
      id: number;
      description: string;
      amount: number;
      quantity: number;
    }[];
  };
}


export interface InvoiceItemInput {
  description: string;
  amount: number;
  quantity: number;
}

export interface CreateInvoiceInput {
  clientName: string;
  clientEmail: string;
  currency?: string; 
  dueDate: string ; 
  items: InvoiceItemInput[];
}
