import { X } from "lucide-react";
import { useAccount } from "wagmi";

const ProfilePage = () => {
  const account = useAccount();

  return (
    <div>
      <div className="w-fit transition-all hover:scale-[102%] active:scale-[98%]">
        <div className="flex">
          {account.isConnected && (
            <>
              <div className="bg-background-secondary border-border-primary rounded-l-xl border border-r-0 px-4 py-2">
                <p>Connected with {account.connector?.name}</p>
              </div>
              <div className="bg-background-tertiary border-border-secondary grid place-items-center rounded-r-xl border px-4 py-2">
                <div className="size-2 animate-pulse rounded-full bg-green-400" />
              </div>
            </>
          )}

          {!account.isConnected && (
            <>
              <div className="bg-background-secondary border-border-primary rounded-l-xl border border-r-0 px-4 py-2">
                <p>Not Connected</p>
              </div>
              <div className="bg-background-tertiary border-border-secondary grid place-items-center rounded-r-xl border px-4 py-2">
                <X size={16} className="text-red-400" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
