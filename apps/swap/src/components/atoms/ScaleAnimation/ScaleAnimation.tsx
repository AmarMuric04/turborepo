import React from "react";
import { cx } from "src/utility";

const ScaleAnimation: React.FC<
  React.PropsWithChildren<{
    className?: string;
    hoverScale?: number;
    activeScale?: number;
  }>
> = ({ children, className, hoverScale = 1.02, activeScale = 0.98 }) => {
  const [scale, setScale] = React.useState(1);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.15s ease-in-out",
      }}
      className={cx(className)}
      onMouseEnter={() => setScale(hoverScale)}
      onMouseLeave={() => setScale(1)}
      onMouseDown={() => setScale(activeScale)}
      onMouseUp={() => setScale(hoverScale)}
    >
      {children}
    </div>
  );
};

export { ScaleAnimation };
