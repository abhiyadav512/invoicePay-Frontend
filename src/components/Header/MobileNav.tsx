import { FileText, Home, Plus, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string): boolean => currentPath === path;

  return (
    <>
      <div className="md:hidden  fixed  dark:bg-sidebar bg-sidebar bottom-0 left-0 right-0 border-t">
        <div className="flex items-center justify-around  py-2">
          <Link
            to={"/dashboard"}
            className={`flex flex-col items-center px-4 py-2 ${
              isActive("/")
                ? "bg-muted text-primary rounded-xl "
                : "text-muted-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to={"/invoices"}
            className={`flex flex-col items-center px-4 py-2  ${
              isActive("/invoices")
                ? "bg-muted text-primary rounded-xl "
                : "text-muted-foreground"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs mt-1">Invoices</span>
          </Link>
          <Link
            to={"/invoice/create"}
            className={`flex flex-col items-center px-4 py-2 ${
              isActive("/invoice/create")
                ? "bg-muted text-primary rounded-xl "
                : "text-muted-foreground"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Create</span>
          </Link>
          <Link
            to={"/setting"}
            className={`flex flex-col items-center px-4 py-2 ${
              isActive("/setting")
                ? "bg-muted text-primary rounded-xl "
                : "text-muted-foreground"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
