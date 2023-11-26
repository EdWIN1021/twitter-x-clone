import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FC, SelectHTMLAttributes, useState } from "react";
import clsx from "clsx";

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant: "sm" | "md" | "lg";
  type: string;
  data: string[] | number[];
}

const DropDown: FC<DropDownProps> = ({ variant, type, data, ...rest }) => {
  const sizes = {
    sm: "w-[90px]",
    md: "w-[115px]",
    lg: "w-[208px]",
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={clsx(
        `${sizes[variant]} border rounded-md h-[60px]  relative overflow-hidden `,
        {
          "border-2 border-[#1D9BF0]": isActive,
        }
      )}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <label
        htmlFor={type}
        className={clsx(
          "absolute block text-[13px] text-[rgb(83,100,113)] left-3 pt-2",
          {
            "text-[#1D9BF0]": isActive,
          }
        )}
      >
        {type}
      </label>

      <select
        {...rest}
        id={type}
        className="w-full outline-none appearance-none h-full pt-7 pb-2 pl-2 pr-2 cursor-pointer"
      >
        <option value=""></option>
        {data?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <ChevronDownIcon className="absolute w-[20px] h-[20px] top-1/2 -translate-y-1/2 right-2" />
    </div>
  );
};

export default DropDown;
