interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button className="bg-primary text-white rounded-full py-2 px-10 w-full">
      {title}
    </button>
  );
};

export default Button;
