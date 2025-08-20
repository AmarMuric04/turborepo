import { ScaleAnimation } from "components/atoms";
import { Dropdown } from "components/molecules";
import { cx } from "src/utility";
import { useChains, useSwitchChain } from "wagmi";

const ChainListDropdown: React.FC<
  React.PropsWithChildren<{
    className?: string;
    onChainClick: ReturnType<typeof useSwitchChain>["switchChain"];
  }>
> = ({ children, className, onChainClick }) => {
  const chains = useChains();

  return (
    <Dropdown buttonClassName={cx("px-3 py-2", className)} button={children}>
      <ul className="flex flex-col gap-1">
        {chains.map((chain) => (
          <li key={chain.id}>
            <ScaleAnimation className="hover:bg-background-tertiary w-full rounded-md py-2">
              <button
                onClick={() => onChainClick({ chainId: chain.id })}
                className="w-full px-4 text-start"
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
