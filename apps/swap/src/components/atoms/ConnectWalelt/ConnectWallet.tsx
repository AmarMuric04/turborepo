import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "components/atoms";

const ConnectWallet: React.FC<{ className?: string | undefined }> = ({
  className,
}) => {
  const { openConnectModal } = useConnectModal();

  return (
    openConnectModal && (
      <Button className={className} onClick={openConnectModal}>
        Connect Wallet
      </Button>
    )
  );
};

export { ConnectWallet };
