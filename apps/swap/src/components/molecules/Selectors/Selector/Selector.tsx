import { ScaleAnimation } from "components/atoms";
import { ChevronDown } from "lucide-react";
import type { TokenInfo } from "src/schemas";
import { cx } from "src/utility";

const Selector: React.FC<{ item?: TokenInfo; className?: string }> = ({
  item,
  className,
}) => {
  return (
    <ScaleAnimation>
      <div
        className={cx(
          "bg-background-secondary border-border-primary flex cursor-pointer items-center gap-1 rounded-xl border px-2 py-1 w-fit",
          {
            "bg-button-primary text-white": !item,
          },
          className
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
  );
};

export { Selector };
