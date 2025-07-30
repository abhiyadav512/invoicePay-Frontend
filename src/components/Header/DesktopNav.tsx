import {
  FileText,
  LayoutDashboard,
  PlusCircle,
  Receipt,
  Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toggle";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Create Invoice", href: "/invoice/create", icon: PlusCircle },
  { name: "Setting", href: "/setting", icon: Settings },
];

const DesktopNav = () => {
  return (
    <div className="hidden md:block fixed top-0 left-0 w-72 h-full border-r border-border shadow-xl z-40 dark:bg-sidebar bg-sidebar">
      <div className=" left-0 top-0 h-full w-72 border-r border-border shadow-xl  relative">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to={"/dashboard"} className="flex items-center space-x-3">
            <div className="w-8 h-8 -rotate-20 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">InvoicePay</h1>
              <p className="text-xs">Professional Invoicing</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  p-3 rounded-md bg-accent text-accent-foreground"
                  : "flex items-center  p-3 rounded-md hover:bg-accent hover:text-accent-foreground"
              }
            >
              <div className="flex items-center space-x-2 ">
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 w-full px-4  border-t pt-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
