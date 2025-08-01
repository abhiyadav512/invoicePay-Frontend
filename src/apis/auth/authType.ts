import type { UserProfile } from "../../components/setting/type";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface updateInput {
  email: string;
  name: string;
  number?: string;
  location?: string;
  dob?: string;
}

export type AuthResponse<T> = {
  success: boolean;
  message: string;
  data: {
    user: T;
  };
};

export interface AuthResponseProfile {
  success: boolean;
  message: string;
  data: UserProfile;
};

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  newPassword: string;
}
