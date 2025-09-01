import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { ScaleAnimation } from "components/atoms";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { cx } from "src/utility";

const Dropdown: React.FC<
  React.PropsWithChildren<{
    button?: React.ReactNode;
    buttonClassName?: string;
  }>
> = ({ children, button, buttonClassName }) => {
  return (
    <div className="max-w-sm">
      <Popover as="div" className="relative z-50">
        {({ open, close }) => (
          <>
            <ScaleAnimation>
              <PopoverButton
                className={cx(
                  "inline-flex items-center justify-between rounded-md text-base font-medium focus:outline-none",
                  buttonClassName
                )}
              >
                {button}
                <ChevronDown
                  className={cx(
                    "ml-2 h-5 w-5 transition-transform duration-150 ease-in-out",
                    {
                      "rotate-180": open,
                    }
                  )}
                  aria-hidden="true"
                />
              </PopoverButton>
            </ScaleAnimation>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                portal
                anchor="bottom start"
                onClick={close}
                className="bg-background-secondary border-border-primary absolute left-0 z-50 mt-3 transform rounded-lg border px-2 py-4 shadow-lg lg:max-w-xs"
              >
                {children}
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
export { Dropdown };
