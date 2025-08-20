import { useAccount } from "wagmi";
import { ConnectWallet } from "components/atoms";

const RequireWalletConnection: React.FC<
  React.PropsWithChildren & { className?: string | undefined }
> = ({ children, className }) => {
  const { isConnected } = useAccount();

  return isConnected ? children : <ConnectWallet className={className} />;
};

export { RequireWalletConnection };
