import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceByID,
  getInvoiceByStatus,
} from "./invoicesApi";
import type { CreateInvoiceInput } from "./invoiceType";

export const useGetAlInvoices = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["invoices", page, limit],
    queryFn: () => getAllInvoices(page, limit),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    keepPreviousData: true,
  });
};

export const useGetInvoiceById = (invoiceId: string) => {
  return useQuery({
    queryKey: ["singleInvoices", invoiceId],
    queryFn: () => getInvoiceByID(invoiceId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useGetInvoiceByStatus = (status: string, userId: string) => {
  return useQuery({
    queryKey: ["snvoiceByStatus", status, userId],
    queryFn: () => getInvoiceByStatus(status, userId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!status,
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoiceId: string) => deleteInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceInput) => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
