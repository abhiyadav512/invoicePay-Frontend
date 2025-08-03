import { Outlet, NavLink } from "react-router-dom";
import {
  Bell,
  Shield,
  User,
  Building2,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../components/contexts/authContexts";
import { useEffect, useState } from "react";

const tabs = [
  { path: "profile", label: "Profile", icon: User },
  { path: "business", label: "Business", icon: Building2 },
  { path: "billing", label: "Billing", icon: CreditCard },
  { path: "notifications", label: "Notifications", icon: Bell },
  { path: "security", label: "Security", icon: Shield },
];

const Setting = () => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex-1">
        <div className="p-4 lg:p-8">
          <div className="mb-6">
            <div className="flex flex-row justify-between sm:items-start mb-4 gap-4">
              <div>
                <h1 className="text-xl lg:text-3xl font-bold mb-2 text-foreground">
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your account and preferences
                </p>
              </div>
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                className="cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>

            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <NavLink
                      key={tab.path}
                      to={tab.path}
                      end={tab.path === "profile"}
                      className={({ isActive }) =>
                        `py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap flex items-center space-x-2 transition-colors duration-200 ${
                          isActive
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
