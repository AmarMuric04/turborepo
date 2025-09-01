import { ChevronDown } from "lucide-react";
import type { TokenInfo } from "src/schemas";
import { cx } from "src/utility";

const TokenDropdownButton: React.FC<{
  token: TokenInfo | null;
  shouldHideChevron?: boolean;
}> = ({ token, shouldHideChevron = false }) => {
  return (
    <div
      className={cx(
        "bg-background-secondary border-border-primary flex cursor-pointer items-center gap-1 rounded-xl border px-2 py-1",
        {
          "bg-button-primary text-white": !token,
        }
      )}
    >
      {token ? (
        <>
          <img className="size-5" src={token.logoURI} />
          <p>{token.symbol}</p>
        </>
      ) : (
        <p>Select a Token</p>
      )}
      {!shouldHideChevron && <ChevronDown size={16} />}
    </div>
  );
};

export { TokenDropdownButton };
