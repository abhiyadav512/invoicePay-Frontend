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
  name: string;
  dob: string;
  location: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    email?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      location: string;
      dob: string;
      number: string;
    };
  };
}

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
