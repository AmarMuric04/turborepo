import { cx } from "src/utility";

const TokenIcon: React.FC<{ url: string | undefined; className?: string }> = ({
  url,
  className,
}) => {
  if (url) {
    return (
      <img
        className={cx("size-4 rounded-full bg-white", className)}
        src={url}
      />
    );
  }

  return (
    <img
      className={cx("size-4 rounded-full bg-white", className)}
      src="https://dzyb4dm7r8k8w.cloudfront.net/prod/logos/MISSING_TOKEN/logo.png"
    />
  );
};

export { TokenIcon };
