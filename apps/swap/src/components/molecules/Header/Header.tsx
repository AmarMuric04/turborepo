import { useChainModal } from "@rainbow-me/rainbowkit";
import {
  Button,
  Logo,
  RequireWalletConnection,
  ThemeSwitcher,
  WalletIcon,
} from "components/atoms";
import { useAccount } from "wagmi";
import { truncateEthAddress } from "src/utility";
import { Link } from "@tanstack/react-router";

const Header = () => {
  const { openChainModal } = useChainModal();

  const { address, chain } = useAccount();

  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Swap",
      path: "/swap",
    },
    {
      name: "Bridge",
      path: "/bridge",
    },
  ];

  return (
    <header className="flex h-16 w-full items-center justify-between gap-2">
      <Logo />
      <div className="flex items-center gap-2">
        <nav className="border-content-secondary mr-4 flex items-center gap-4 border-r px-4">
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className="hover:underline">
              {page.name}
            </Link>
          ))}
        </nav>

        <ThemeSwitcher />

        <RequireWalletConnection>
          <div className="flex items-center gap-8">
            {openChainModal && (
              <Button onClick={openChainModal}>{chain?.name}</Button>
            )}

            {address && (
              <div className="flex items-center gap-2">
                <WalletIcon size={20} />
                <Link to="/profile">{truncateEthAddress({ address })}</Link>
              </div>
            )}
          </div>
        </RequireWalletConnection>
      </div>
    </header>
  );
};

export { Header };
