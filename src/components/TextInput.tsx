import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  outline?: boolean;
  value: string;
  id: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, value, ...rest }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    value && setIsActive(true);
  }, [value]);

  return (
    <div className="relative h-[60px] w-full">
      <input
        id={id}
        {...rest}
        value={value}
        maxLength={50}
        className={clsx(
          ` w-full rounded-md border px-4 pb-1 pt-7 leading-normal outline-[#1D9BF0]`
        )}
        onFocus={() => setIsActive(true)}
        onBlur={() => !value && setIsActive(false)}
      />
      <label
        className={clsx(
          `absolute cursor-text duration-200 text-[rgb(83,100,113)]`,
          {
            "left-[5%] top-1/2 -translate-y-1/2 ": !isActive,
          },
          {
            "left-[3%] top-[20%] text-xs text-[#1D9BF0]": isActive,
          }
        )}
        htmlFor={id}
      >
        {label}
      </label>

      <span
        className={clsx(
          "absolute top-2 right-2 opacity-0 text-[rgb(83,100,113)]",
          {
            "opacity-100": isActive,
          }
        )}
      >
        {value.length} / 50
      </span>
    </div>
  );
};

export default TextInput;
