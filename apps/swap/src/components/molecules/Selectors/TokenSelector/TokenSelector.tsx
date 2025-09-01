import { ScaleAnimation, TokenDropdownButton } from "components/atoms";
import { TokenListModal } from "components/molecules";
import type { TokenInfo } from "src/schemas";

const TokenSelector: React.FC<{
  item: TokenInfo | null;
  onSelect: (token: TokenInfo) => void;
}> = ({ item, onSelect }) => {
  return (
    <TokenListModal onTokenClick={onSelect}>
      <ScaleAnimation>
        <TokenDropdownButton token={item} />
      </ScaleAnimation>
    </TokenListModal>
  );
};

export { TokenSelector };
