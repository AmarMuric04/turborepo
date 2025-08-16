import { Moon, Sun } from "lucide-react";
import { useTheme } from "src/hooks";

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      className="text-content-primary bg-background-secondary p-2 rounded-md"
      onClick={toggleTheme}
    >
      {isDarkTheme ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export { ThemeSwitcher };
