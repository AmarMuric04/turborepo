import { SwapForm } from "components/organisms";
import { HeroPageBackground } from "src/svgs";

const Title = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl tracking-tight">A verrry bad trading platform</h1>
    </div>
  );
};

const SwapPage = () => {
  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <HeroPageBackground className="absolute inset-0 top-0 right-0 w-full blur-sm" />
      <div className="relative z-10 mx-auto flex w-lg flex-col items-center pt-20">
        <div className="mb-4 max-w-md">
          <Title />
        </div>
        <SwapForm />
      </div>
    </div>
  );
};

export { SwapPage };
