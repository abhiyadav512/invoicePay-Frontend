import { axiosInstance } from "../../lib/axiosInstance";
import type { CreateInvoiceInput, InvoiceResponse, SingleInvoiceResponse } from "./invoiceType";

export const getAllInvoices = async (
  page: number,
  limit: number
): Promise<InvoiceResponse> => {
  const response = await axiosInstance.get(
    `/invoice?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getInvoiceByID = async (
  invoiceId: string
): Promise<SingleInvoiceResponse> => {
  const response = await axiosInstance.get(`invoice/${invoiceId}`);
  return response.data;
};

export const getInvoiceByStatus = async (
  status: string,
  userId: string
): Promise<InvoiceResponse> => {
  const response = await axiosInstance.get(
    `dashboard/invoices?status=${status}&id=${userId}`
  );
  return response.data;
};

export const deleteInvoice = async (invoiceId: string) => {
  const response = await axiosInstance.delete(`invoice/delete/${invoiceId}`);
  return response.data;
};



export const createInvoice = async (data: CreateInvoiceInput) => {
  const response = await axiosInstance.post("/invoice/create", data);
  return response.data;
};
