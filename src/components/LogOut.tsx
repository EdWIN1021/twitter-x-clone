import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogOut: React.FC = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="absolute top-[-110%] py-3 px-1 shadow-[0_0_15px_rgba(101,119,134,0.2)] rounded-xl text-[15px] font-bold cursor-pointer z-50">
      <span
        className="hover:bg-hover-gray pl-5 pr-10 py-2 whitespace-nowrap "
        onClick={() => signOut(() => navigate("/"))}
      >
        Log out @EdwinShi978121
      </span>
      <img
        src="/triangle.svg"
        className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 rotate-180 w-5 -z-10"
        alt=""
      />
    </div>
  );
};

export default LogOut;
