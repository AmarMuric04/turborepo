import {
  Button,
  Label,
  PageSection,
  ScaleAnimation,
  Switch,
  SwitchButton,
} from "components/atoms";
import { FormCard, Input, Selector } from "components/molecules";
import { useAccount, useSwitchChain } from "wagmi";

const PercentageSelector: React.FC = () => {
  return (
    <div className="text-button-secondary flex items-center gap-2 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <button>50%</button>
      <button>75%</button>
      <button>100%</button>
    </div>
  );
};

const BridgePage = () => {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitchToSource = () => {
    switchChain({ chainId: 1 });
  };

  const handleSwitchToDestinationChain = () => {
    switchChain({ chainId: 43114 });
  };

  return (
    <PageSection>
      <FormCard className="w-126">
        <header className="flex items-center justify-between gap-4">
          <h1>CCTP</h1>
          <div className="text-content-tertiary flex items-center gap-2 italic">
            <p>Fast</p>
            <Switch />
          </div>
        </header>

        <div className="relative flex w-full gap-4">
          <ScaleAnimation className="flex-1">
            <div className="bg-background-tertiary hover:bg-background-tertiary/80 flex flex-col space-y-2 rounded-xl px-4 py-5">
              <header className="flex items-center justify-between">
                <Label>FROM</Label>
                {chainId != 1 ? (
                  <Button
                    onClick={handleSwitchToSource}
                    variant="outline"
                    className="px-2 py-1 text-xs"
                  >
                    Connect
                  </Button>
                ) : (
                  <Button className="px-2 py-1 text-xs">Connected</Button>
                )}
              </header>
              <Selector />
            </div>
          </ScaleAnimation>

          <SwitchButton className="rotate-270" onClick={() => {}} />

          <ScaleAnimation className="flex-1">
            <div className="bg-background-tertiary hover:bg-background-tertiary/80 flex flex-col space-y-2 rounded-xl px-4 py-5">
              <header className="flex items-center justify-between">
                <Label>TO</Label>
                {chainId != 43114 ? (
                  <Button
                    onClick={handleSwitchToDestinationChain}
                    variant="outline"
                    className="px-2 py-1 text-xs"
                  >
                    Connect
                  </Button>
                ) : (
                  <Button className="px-2 py-1 text-xs">Connected</Button>
                )}
              </header>
              <Selector />
            </div>
          </ScaleAnimation>
        </div>

        <Input
          disabled={!isConnected}
          id="from-input"
          topLeftComponent={<Label htmlFor="from-input">FROM</Label>}
          topRightComponent={<PercentageSelector />}
          bottomLeftComponent={
            <p className="text-content-secondary text-sm">$0</p>
          }
          centerComponent={<Selector />}
        />
        <Button className="w-full rounded-xl py-4">Start Transfer</Button>
      </FormCard>
    </PageSection>
  );
};

export { BridgePage };
