import Overlay from "./Overlay";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  open,
  toggle,
}: {
  children: React.ReactNode;
  open: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return createPortal(
    <>
      {open && (
        <div>
          <Overlay toggle={toggle} />

          <div className="bg-white w-[600px] p-4 rounded-2xl shadow-xl justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <XMarkIcon
              onClick={() => toggle(false)}
              className="w-[20px] h-[20px]  left-[3%] top-[3%] cursor-pointer"
            />
            {children}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
