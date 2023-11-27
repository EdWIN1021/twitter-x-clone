import { twMerge } from "tailwind-merge";

interface TypographyProps {
  title: string;
  variant: string;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  title,
  variant,
  className,
}) => {
  switch (variant) {
    case "h2":
      return (
        <h2 className={twMerge("text-[31px] font-bold", className)}>{title}</h2>
      );
    case "p":
      return (
        <p className={twMerge("text-[rgb(83,100,113)] text-[14px]", className)}>
          {title}
        </p>
      );
  }
};

export default Typography;
