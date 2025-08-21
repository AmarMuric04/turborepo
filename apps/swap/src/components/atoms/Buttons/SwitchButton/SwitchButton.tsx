import { ArrowDown } from "lucide-react";
import { Button } from "components/atoms";
import { cx } from "src/utility";

const SwitchButton: React.FC<{
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
}> = ({ isDisabled = false, onClick, className }) => {
  return (
    <div
      className={cx(
        "bg-background-secondary absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-1",
        className
      )}
    >
      <Button
        disabled={isDisabled}
        onClick={onClick}
        className="grid size-8 place-items-center rounded-full p-1 transition-transform duration-300 hover:rotate-360"
      >
        <ArrowDown size={16} />
      </Button>
    </div>
  );
};

export { SwitchButton };
