import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useVerifyOtp } from "../../apis/auth/useAuth";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const verifyOtpMutation = useVerifyOtp();

  React.useEffect(() => {
    if (!email) {
      toast.error("Please register first");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    verifyOtpMutation.mutate({ email, otp });
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-6">
      <div className="w-full max-w-sm sm:max-w-md   sm:p-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="  p-2.5 sm:p-3">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Verify Your Account
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          We've sent a 6-digit verification code to <br />
          <span className="font-medium text-black">
            {email || "your email"}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className="text-center tracking-widest text-base sm:text-lg"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={verifyOtpMutation.isPending || otp.length !== 6}
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 mt-5">Code expires in 10 minutes</p>
      </div>
    </div>
  );
};

export default VerifyOtp;
