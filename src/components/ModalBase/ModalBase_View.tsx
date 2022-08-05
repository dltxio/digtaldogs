import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
};

const ModalBase: React.FC<Props> = (props) => {
  const closeButtonRef = useRef(null);
  return (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="py-10 z-50 fixed inset-0 overflow-y-auto sm:py-0"
        onClose={props.onClose}
        initialFocus={closeButtonRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-white opacity-60" />

          <span
            className="inline-block h-screen align-middle "
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="z-50 inline-block w-full max-w-2xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              {props.children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalBase;
