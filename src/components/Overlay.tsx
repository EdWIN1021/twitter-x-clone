import React from "react";

import { createPortal } from "react-dom";

const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return createPortal(
    <div className="absolute bg-[rgba(0,0,0,0.40)] top-0 w-full h-full flex justify-center items-center">
      {children}
    </div>,
    document.body
  );
};

export default Overlay;
