import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FC, useMemo, useState } from "react";

const DropDown: FC<{
  size: "sm" | "md" | "lg";
  type: string;
  data: string[] | number[];
}> = ({ size, type, data }) => {
  const sizes = {
    sm: "w-[90px]",
    md: "w-[115px]",
    lg: "w-[208px]",
  };

  const title = useMemo(
    () => type.charAt(0).toUpperCase() + type.slice(1),
    [type]
  );

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`${sizes[size]} border rounded-md h-[60px]  relative overflow-hidden`}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <label
        htmlFor={title}
        className="absolute block text-[13px] text-[rgb(83,100,113)] left-2 pt-2"
      >
        {title}
      </label>

      <div>{isActive}</div>

      <select
        id={title}
        className="w-full outline-none appearance-none h-full pt-7 pb-2 pl-2 pr-2"
        onClick={() => console.log("a")}
      >
        <option value=""></option>
        {data?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <ChevronDownIcon className="absolute w-[20px] h-[25px] top-1/2 -translate-y-1/2 right-2" />
    </div>
  );
};

export default DropDown;
