import { ScaleAnimation } from "components/atoms";
import { TokenListModal } from "../../Modals";
import { ChevronDown } from "lucide-react";
import type { TokenInfo } from "src/schemas";
import { cx } from "src/utility";

const TokenSelector: React.FC<{
  item: TokenInfo | null;
  onSelect: (token: TokenInfo) => void;
}> = ({ item, onSelect }) => {
  return (
    <TokenListModal onTokenClick={onSelect}>
      <ScaleAnimation>
        <div
          className={cx(
            "bg-background-secondary border-border-primary flex cursor-pointer items-center gap-1 rounded-xl border px-2 py-1",
            {
              "bg-button-primary text-white": !item,
            }
          )}
        >
          {item ? (
            <>
              <img className="size-5" src={item.logoURI} />
              <p>{item.symbol}</p>
            </>
          ) : (
            <p>Select a Token</p>
          )}
          <ChevronDown size={16} />
        </div>
      </ScaleAnimation>
    </TokenListModal>
  );
};

export { TokenSelector };
