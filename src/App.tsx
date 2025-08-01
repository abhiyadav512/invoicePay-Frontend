import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import { ThemeProvider } from "./components/theme/theme-provider";
import SingleInvoice from "./pages/SingleInvoice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import VerifyOtp from "./components/auth/VerifyOtp";
import { AuthProvider } from "./components/contexts/authContexts";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Setting from "./pages/Setting";
import ProfileTab from "./components/setting/ProfileTab";
import BusinessTab from "./components/setting/BussinessTab";
import Invoices from "./pages/Invoice";
import BillingTab from "./components/setting/BillingTab";
import NotificationTab from "./components/setting/NotificationTab";
import SecurityTab from "./components/setting/SecurityTab";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFoundPage from "./pages/NotFoundPage";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/payment-sucess",
    element: <PaymentSuccess />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoices",
        element: (
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoice/create",
        element: (
          <ProtectedRoute>
            <CreateInvoicePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoice/:invoiceId",
        element: (
          <ProtectedRoute>
            <SingleInvoice />
          </ProtectedRoute>
        ),
      },
      {
        path: "/setting",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <ProfileTab />,
          },
          {
            path: "business",
            element: <BusinessTab />,
          },
          {
            path: "billing",
            element: <BillingTab />,
          },
          {
            path: "notifications",
            element: <NotificationTab />,
          },
          {
            path: "security",
            element: <SecurityTab />,
          },
        ],
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFoundPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark">
          <RouterProvider router={router} />
        </ThemeProvider>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
