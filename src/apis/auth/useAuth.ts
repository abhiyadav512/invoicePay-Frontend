import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  getUserProfile,
  loginUser,
  RegisterUser,
  resetPassword,
  updateUserProfile,
  verifyOtp,
} from "./authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/authContexts";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response?.data?.user) {
        auth.login(response.data.user);
        // console.log(response.data.user);
        toast.success("Login successful!");
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        navigate("/dashboard");
      } else {
        toast.error("Login failed. User data missing.");
      }
    },
    onError: (err: any) => {
      // console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: RegisterUser,
    onSuccess: (_res, variables) => {
      toast.success("Check your email to verify your account.");
      navigate("/verify-otp", { state: { email: variables.email } });
    },
    onError: (err: any) => {
      // console.error("Register error:", err);
      toast.error(err.response?.data?.message || "Registration failed.");
    },
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP Verified! Please login.");
      navigate("/login");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "OTP verification failed.");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Reset link sent to email.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Request failed.");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      toast.success(res.message || "Password reset successful.");
      navigate("/login");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Reset failed.");
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (res) => {
      toast.success(res.message || "profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Update failed.");
    },
  });
};