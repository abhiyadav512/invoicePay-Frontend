import { axiosInstance } from "../../lib/axiosInstance";
import type {
  BusinessResponse,
  SetupBusinessInput,
  UpdateBusinessInput,
} from "./businessType";

export const getBusiness = async (): Promise<BusinessResponse> => {
  const response = await axiosInstance.get("/business");
  return response.data;
};

export const setupBusiness = async (
  data: SetupBusinessInput
): Promise<BusinessResponse> => {
  const response = await axiosInstance.post("/business/setup", data);
  return response.data;
};

export const updateBusiness = async (
  data: UpdateBusinessInput
): Promise<BusinessResponse> => {
  const response = await axiosInstance.patch("/business/update", data);
  return response.data;
};
