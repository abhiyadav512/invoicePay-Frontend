import { Receipt, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toggle";
import { useGetProfile } from "../../apis/auth/useAuth";

type ProfileData = {
  data?: {
    name?: string;
    email?: string;
  };
};

export default function Navbar() {
  const { data } = useGetProfile() as ProfileData;
  console.log(data);
  return (
    <nav>
      <div
        className="z-50 bg-sidebar/60 backdrop-blur-md sticky top-0 hidden md:flex justify-between items-center py-4 px-10 border-b"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative w-1/2 max-w-md">
          <Input
            type="text"
            placeholder="Enter client name"
            className="h-10 pr-10"
            aria-label="Search for client"
          />
          <Button
            size="icon"
            variant="outline"
            className="absolute right-0 top-0 h-10 w-10"
            aria-label="Search"
          >
            <Search />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
            alt="Dealdu logo"
            className="h-9 w-9 object-contain rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium leading-none">{data?.name}</p>
            <p className="text-gray-500 text-xs">{data?.email}</p>
          </div>
        </div>
      </div>
      <div className="bg-sidebar/60 backdrop-blur-md sticky top-0 md:hidden flex items-center justify-between py-4 px-2 z-50">
        <Link to={"/dashboard"} className="flex gap-2 items-center">
          <Receipt className="w-6 h-6 -rotate-20" />
        </Link>

        <div className="flex items-center relative w-8/12">
          <Input placeholder="Enter client name" className="h-9" />
          <Button
            size="icon"
            variant="outline"
            className="absolute right-0 h-9 w-9"
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}
