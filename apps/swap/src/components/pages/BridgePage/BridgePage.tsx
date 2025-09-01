import {
  Badge,
  Button,
  Label,
  ScaleAnimation,
  Switch,
  SwitchButton,
  TokenDropdownButton,
} from "components/atoms";
import {
  ChainListDropdown,
  FormCard,
  Input,
  PercentageSelector,
} from "components/molecules";
import { USDC } from "src/constants";
import { useChain } from "src/hooks";
import { Route } from "src/routes/__root";
import type { Chain, ChainId } from "src/schemas";
import { useCCTP } from "src/store";
import { HeroPageBackground } from "src/svgs";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const ChainInput: React.FC<{
  label?: string;
  chainId: ChainId;
  setChainId: ({ chainId }: { chainId: ChainId }) => void;
}> = ({ label, chainId, setChainId }) => {
  const { switchChain } = useSwitchChain();
  const currentChainId = useChainId();

  Route.useParams();

  const chain = useChain({ chainId });

  const handleSwitchChain = () => {
    switchChain({ chainId: chainId });
  };

  const handleChangeChain = ({ chain }: { chain: Chain }) => {
    setChainId({ chainId: chain.id });
  };

  return (
    <ScaleAnimation className="w-full">
      <div className="bg-background-tertiary hover:bg-background-tertiary/80 flex flex-col space-y-2 rounded-xl px-4 py-5">
        <header className="flex items-center justify-between">
          {label && <Label>{label}</Label>}
          {currentChainId != chainId ? (
            <Button
              onClick={handleSwitchChain}
              variant="outline"
              className="px-2 py-0.5 text-xs"
            >
              Connect
            </Button>
          ) : (
            <Badge variant="positive">
              <div className="flex items-center gap-1">
                <p>Connected</p>
                <div className="mx-0.5 size-1 animate-pulse rounded-full bg-green-800 dark:bg-green-400" />
              </div>
            </Badge>
          )}
        </header>
        <ChainListDropdown
          className="bg-button-primary w-full rounded-xl text-white"
          onChainClick={handleChangeChain}
        >
          {chain?.name}
        </ChainListDropdown>
      </div>
    </ScaleAnimation>
  );
};

const Title = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl tracking-tight">Take a walk over the bridge</h1>
    </div>
  );
};

const BridgePage = () => {
  const { isConnected } = useAccount();

  const percentages = [
    { value: 25, action: () => {} },
    { value: 50, action: () => {} },
    { value: 75, action: () => {} },
    { value: 100, action: () => {} },
  ];

  const {
    sourceChainId,
    destinationChainId,
    setSourceChainId,
    setDestinationChainId,
    transferType,
    changeTransferType,
    toggleChains,
  } = useCCTP();

  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <HeroPageBackground className="absolute inset-0 top-0 right-0 w-full blur-sm" />
      <div className="relative z-10 mx-auto flex w-lg flex-col items-center pt-20">
        <div className="mb-4 max-w-md">
          <Title />
        </div>
        <FormCard className="w-126">
          <header className="flex items-center justify-end gap-4 py-2">
            <div className="text-content-tertiary flex items-center gap-2 italic">
              <p>Fast</p>
              <Switch
                checked={transferType === "fast"}
                onCheck={changeTransferType}
              />
            </div>
          </header>
          <div className="relative flex w-full gap-4">
            <ChainInput
              label="FROM"
              chainId={sourceChainId}
              setChainId={setSourceChainId}
            />

            <SwitchButton className="rotate-270" onClick={toggleChains} />

            <ChainInput
              label="TO"
              chainId={destinationChainId}
              setChainId={setDestinationChainId}
            />
          </div>
          <Input
            disabled={!isConnected}
            id="from-input"
            topLeftComponent={<Label htmlFor="from-input">FROM</Label>}
            topRightComponent={<PercentageSelector percentages={percentages} />}
            bottomLeftComponent={
              <p className="text-content-secondary text-sm">$0</p>
            }
            centerComponent={
              <TokenDropdownButton token={USDC} shouldHideChevron />
            }
          />
          <Button className="w-full rounded-xl py-4">Start Transfer</Button>
        </FormCard>
      </div>
    </div>
  );
};

export { BridgePage };
