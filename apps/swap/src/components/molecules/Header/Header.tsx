import { Bitcoin } from "lucide-react";
import { ThemeSwitcher } from "../ThemeSwitcher";

const Header = () => {
  return (
    <header className="px-32 flex h-16 gap-2 w-full justify-between items-center">
      <div className="flex items-center gap-2">
        <Bitcoin />
        <p className="text-sm font-thin hidden lg:block">Murga swap</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <button className="text-white rounded-3xl text-sm px-4 py-2 bg-button-primary">
          Launch App
        </button>
      </div>
    </header>
  );
};

export { Header };
