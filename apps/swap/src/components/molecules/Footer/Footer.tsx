import { Link } from "@tanstack/react-router";
import { Logo } from "components/atoms";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between py-4">
      <div className="flex items-center gap-8">
        <Logo />
        <nav className="text-content-tertiary flex items-center gap-2 text-xs">
          <Link to="/">Terms & Conditions</Link>
          <p>•</p>
          <Link to="/">Wallet</Link>
          <p>•</p>
          <Link to="/">Explorer</Link>
        </nav>
      </div>
      <p className="text-content-tertiary text-xs">
        © 2025 MurgaSwap. No rights reserved
      </p>
    </footer>
  );
};

export { Footer };
