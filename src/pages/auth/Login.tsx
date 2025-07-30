import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../apis/auth/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginuser = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginuser.mutate(form);
  };
  
  const handleGoogleLogin = () => {
    alert("Google Sign-in not implemented yet!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-xl sm:p-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            InvoicePay
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your email and password or use Google.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                value={form.password}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginuser.isPending}
          >
            {loginuser.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-muted-foreground text-xs">
          <span className="w-full h-px bg-border" />
          <span>OR</span>
          <span className="w-full h-px bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full"
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary underline hover:opacity-80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
