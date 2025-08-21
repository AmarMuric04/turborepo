import { cx } from "src/utility";

const FormCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        "bg-background-secondary flex flex-col gap-2 rounded-2xl p-2 shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export { FormCard };
