import { cx } from "src/utility";

const PageSection: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={cx("container mx-auto px-2", className)}>{children}</div>
  );
};

export { PageSection };
