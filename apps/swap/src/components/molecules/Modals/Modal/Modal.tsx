import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment } from "react";

const Modal: React.FC<
  React.PropsWithChildren<{
    button: React.ReactNode;
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
  }>
> = ({ children, button, isOpen = false, setIsOpen, title }) => {
  return (
    <>
      {button}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="bg-background-secondary border-border-primary min-h-lg w-full max-w-sm transform overflow-hidden rounded-2xl border p-6 text-left align-middle shadow-xl transition-all">
                  <header className="flex items-start justify-between">
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium"
                    >
                      <p>{title}</p>
                    </DialogTitle>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-background-tertiary rounded-md p-1"
                    >
                      <X size={16} />
                    </button>
                  </header>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export { Modal };
