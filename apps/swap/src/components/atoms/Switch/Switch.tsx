import React from "react";
import { Switch as HSwitch } from "@headlessui/react";
import { cx } from "src/utility";

const Switch: React.FC<{ checked: boolean; onCheck: () => void }> = ({
  checked,
  onCheck,
}) => {
  return (
    <HSwitch
      checked={checked}
      onChange={onCheck}
      className={cx(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75",
        { "bg-button-primary": checked, "bg-background-tertiary": !checked }
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
          { "translate-x-4": checked, "translate-x-0": !checked }
        )}
      />
    </HSwitch>
  );
};
export { Switch };
