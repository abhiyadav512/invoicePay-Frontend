import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} variant="ghost" className="relative cursor-pointer">
      <Sun className="w-16 h-16 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="w-16 h-16 absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
