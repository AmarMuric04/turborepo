import { cx } from "src/utility";
import type React from "react";
import { ScaleAnimation } from "components/atoms";
import { Loader2 } from "lucide-react";

const Button: React.FC<
  React.PropsWithChildren &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary" | "outline";
      size?: "small" | "medium" | "large";
      isLoading?: boolean;
    }
> = ({ children, className, variant = "primary", isLoading, ...props }) => {
  return (
    <ScaleAnimation>
      <button
        className={cx(
          "rounded-xl text-sm px-4 py-2 cursor-pointer flex gap-2 items-center justify-center",
          className,
          {
            "bg-button-primary text-white": variant === "primary",
            "bg-background-secondary border border-border-primary":
              variant === "secondary",
            "border border-button-primary text-button-primary":
              variant === "outline",
          }
        )}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    </ScaleAnimation>
  );
};

export { Button };
