import { ScaleAnimation } from "components/atoms";
import { cx } from "src/utility";

const Input: React.FC<
  {
    topLeftComponent?: React.ReactNode;
    topRightComponent?: React.ReactNode;
    bottomLeftComponent?: React.ReactNode;
    bottomRightComponent?: React.ReactNode;
    centerComponent?: React.ReactNode;
    className?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  topLeftComponent,
  topRightComponent,
  bottomLeftComponent,
  bottomRightComponent,
  centerComponent,
  className,
  ...props
}) => {
  return (
    <ScaleAnimation>
      <div
        className={cx(
          "bg-background-tertiary focus-within:[&:hover]:bg-background-primary hover:bg-background-tertiary/80 focus-within:bg-background-secondary focus-within:outline-button-primary focus-within:outline-2 border-border-primary flex flex-col rounded-xl border px-2 py-5 group",
          className
        )}
      >
        <div className="flex grow items-center justify-between">
          {topLeftComponent}
          {topRightComponent}
        </div>
        <div className="flex w-full items-center justify-between">
          <input
            className="w-1/2 py-2 text-3xl outline-none"
            placeholder="0.01"
            {...props}
          />
          {centerComponent}
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          {bottomLeftComponent}
          {bottomRightComponent}
        </div>
      </div>
    </ScaleAnimation>
  );
};

export { Input };
