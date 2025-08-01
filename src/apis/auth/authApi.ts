import { axiosInstance } from "../../lib/axiosInstance";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  updateInput,
  VerifyOtpInput,
} from "./authType";

export const getUserProfile = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get("/user/auth/me");
  return response.data;
};

export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/auth/login", data);
  return response.data;
};

export const RegisterUser = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/auth/register", data);
  return response.data;
};

export const LogoutUser = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/auth/logout");
  return response.data;
};

export const verifyOtp = async (
  data: VerifyOtpInput
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/auth/verifiy-otp", data);
  return response.data;
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (data: {
  newPassword: string;
  token: string;
}): Promise<AuthResponse> => {
  const response = await axiosInstance.post(
    `/user/auth/reset-password/${data.token}`,
    data
  );
  return response.data;
};

export const updateUserProfile = async (
  data: updateInput
): Promise<AuthResponse> => {
  const response = await axiosInstance.patch("/user/auth/update", data);
  return response.data;
};