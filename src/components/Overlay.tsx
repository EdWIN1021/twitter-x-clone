import React from "react";

const Overlay: React.FC<{
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ toggle }) => {
  return (
    <div
      onClick={() => {
        toggle(false);
      }}
      className="absolute bg-[rgba(0,0,0,0.40)] top-0 w-full h-full flex justify-center items-center"
    ></div>
  );
};

export default Overlay;
