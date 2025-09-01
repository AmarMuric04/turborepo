import React from "react";
import { cx } from "src/utility";

const Badge = (
  props: Readonly<{
    children?: Readonly<React.ReactElement>;
    variant?: "positive" | "negative" | "neutral" | "warning";
  }>
) => {
  const { children, variant = "neutral" } = props;

  return (
    <div
      className={cx("rounded-md border px-1 py-0.5 text-xs", {
        "dark:border-red-400 dark:text-red-400 text-red-800 border-red-800 dark:bg-red-900/20 bg-red-200/20":
          variant === "negative",
        "dark:border-green-400 dark:text-green-400 text-green-800 border-green-800 dark:bg-green-900/20 bg-green-200/20":
          variant === "positive",
        "dark:border-orange-400 dark:text-orange-400 text-orange-800 border-orange-800 dark:bg-orange-900/20 bg-orange-200/20":
          variant === "warning",
        "dark:border-gray-400 dark:text-gray-400 text-gray-800 border-gray-800 dark:bg-gray-900/20 bg-gray-200/20":
          variant === "neutral",
      })}
    >
      {children}
    </div>
  );
};

export { Badge };
