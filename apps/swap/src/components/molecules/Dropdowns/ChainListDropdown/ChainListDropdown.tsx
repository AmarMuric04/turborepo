import { ScaleAnimation } from "components/atoms";
import { Dropdown } from "components/molecules";
import { useChains } from "src/hooks";
import type { Chain } from "src/schemas";
import { cx } from "src/utility";

const ChainListDropdown: React.FC<
  React.PropsWithChildren<{
    className?: string;
    onChainClick: ({ chain }: { chain: Chain }) => void;
  }>
> = ({ children, className, onChainClick }) => {
  const chains = useChains();

  return (
    <Dropdown buttonClassName={cx("px-3 py-2", className)} button={children}>
      <ul className="flex flex-col gap-1">
        {chains.map((chain) => (
          <li key={chain.id}>
            <ScaleAnimation className="hover:bg-background-tertiary w-full rounded-md">
              <button
                onClick={() => onChainClick({ chain })}
                className="w-full px-4 py-2 text-start"
              >
                <p>{chain.name}</p>
              </button>
            </ScaleAnimation>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export { ChainListDropdown };
