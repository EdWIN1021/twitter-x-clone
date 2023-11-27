import React, { useContext } from "react";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";

import { StepperContext } from "./Stepper";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, showCloseButton = true }) => {
  const { prevStep, activeStep } = useContext(StepperContext);
  const { resetFields } = useContext(AuthContext);

  const navigate = useNavigate();

  return createPortal(
    <div>
      <div className="bg-white w-[600px] p-4 rounded-2xl shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {showCloseButton && (
          <>
            {activeStep < 2 ? (
              <div className="inline-block p-2 hover:bg-[rgb(0,0,0,0.1)] rounded-full">
                <XMarkIcon
                  onClick={() => {
                    navigate("/");
                    resetFields();
                  }}
                  className="w-[20px] h-[20px]  left-[3%] top-[3%] cursor-pointer"
                />
              </div>
            ) : (
              <div className="inline-block p-2 hover:bg-[rgb(0,0,0,0.1)] rounded-full">
                <ArrowLeftIcon
                  onClick={() => prevStep()}
                  className="w-[20px] h-[20px]  left-[3%] top-[3%] cursor-pointer"
                />
              </div>
            )}
          </>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
