import { Link } from "@tanstack/react-router";
import { Bitcoin } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to="/"
      className="hover:text-button-secondary flex items-center gap-2"
    >
      <Bitcoin />
      <p className="hidden text-sm font-thin lg:block">Murga App</p>
    </Link>
  );
};

export { Logo };
