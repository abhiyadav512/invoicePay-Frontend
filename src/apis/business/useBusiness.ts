import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBusiness, setupBusiness, updateBusiness } from "./businessApi";
import { toast } from "sonner";

export const useGetBusiness = () => {
  return useQuery({
    queryKey: ["businessProfile"],
    queryFn: getBusiness,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useSetupBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupBusiness,
    onSuccess: (response) => {
      toast.success(
        response.message || "Business profile created successfully."
      );
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Error in creating business profile"
      );
    },
  });
};

export const useUpdateBusinessInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBusiness,
    onSuccess: () => {
      toast.success("Business updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Error in updating business profile"
      );
    },
  });
};
