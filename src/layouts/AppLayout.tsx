import { Outlet } from "react-router-dom";
import MobileNav from "../components/Header/MobileNav";
import Footer from "../components/Footer";
import Navbar from "../components/Header/Navbar";
import DesktopNav from "../components/Header/DesktopNav";
import { Analytics } from "@vercel/analytics/react";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-sidebar bg-sidebar text-secondary-foreground">
      <DesktopNav />
      <div className="md:ml-72 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
          <Analytics />
        </main>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default AppLayout;
