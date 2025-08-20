import { useEnsAvatar, useEnsName, useAccount } from "wagmi";
import Jazzicon from "react-jazzicon";

const WalletIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  if (ensAvatar)
    return <img src={ensAvatar} className="h-8 w-8 rounded-full" />;
  return (
    <Jazzicon diameter={size} seed={parseInt(address!.slice(2, 10), 16)} />
  );
};

export { WalletIcon };
