import React from "react";
import { Switch as HSwitch } from "@headlessui/react";

const Switch = () => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <HSwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-button-primary" : "bg-content-tertiary"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HSwitch>
  );
};
export { Switch };
