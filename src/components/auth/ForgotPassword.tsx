import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { useForgotPassword } from "../../apis/auth/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }

    forgotPasswordMutation.mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
      <div className="w-full max-w-sm sm:max-w-md bg-sidebar lg:max-w-lg p-6 sm:p-8  shadow-md rounded-xl text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-accent rounded-full">
            <MailCheck className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold ">Forgot Password</h2>
        <p className="text-sm sm:text-base text-gray-400 mt-2">
          Enter your registered email to receive a reset code.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm sm:text-base"
            required
          />

          <Button
            type="submit"
            className="w-full text-sm sm:text-base"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
