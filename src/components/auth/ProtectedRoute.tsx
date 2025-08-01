import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContexts";
import { Receipt } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-sidebar dark:bg-sidebar z-[9999]">
        <div className="flex flex-col items-center space-y-8 text-center px-4">
          <div className="relative">
            <Receipt
              className="text-primary w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                        animate-pulse drop-shadow-lg transform -rotate-12 transition-all duration-300"
            />
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Loading your workspace
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-xs xs:max-w-sm">
              Please wait while we prepare everything for you
            </p>
          </div>

          <div className="w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 h-2 xs:h-2.5 sm:h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full loading-animation shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
