import { Outlet, NavLink } from "react-router-dom";
import { Bell, Shield, User, Building2, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../components/contexts/authContexts";
import { useEffect } from "react";

const tabs = [
  { path: "profile", label: "Profile", icon: User },
  { path: "business", label: "Business", icon: Building2 },
  { path: "billing", label: "Billing", icon: CreditCard },
  { path: "notifications", label: "Notifications", icon: Bell },
  { path: "security", label: "Security", icon: Shield },
];

const Setting = () => {
  const { logout } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="flex-1">
        <div className="p-4 lg:p-8">
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <h1 className="text-xl lg:text-3xl font-bold mb-2">Settings</h1>
                <p className="text-gray-600">
                  Manage your account and preferences
                </p>
              </div>
              <Button onClick={logout} className="cursor-pointer">Logout</Button>
            </div>

            <div className="border-b border-gray-700">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <NavLink
                      key={tab.path}
                      to={tab.path}
                      className={({ isActive }) =>
                        `py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap flex items-center space-x-2 transition-colors ${
                          isActive
                            ? "border-accent-foreground text-accent-foreground"
                            : "border-transparent text-muted-foreground hover:text-accent-foreground hover:border-accent-foreground"
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Setting;
