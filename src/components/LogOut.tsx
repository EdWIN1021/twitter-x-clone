import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogOut: React.FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
  username?: string;
}> = ({ toggle, username }) => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logOutRef?.current?.focus();
  }, []);

  return (
    <div
      className="absolute top-[-110%] py-3 px-1 shadow-[0_0_15px_rgba(101,119,134,0.2)] rounded-xl text-[15px] font-bold cursor-pointer z-50 outline-none"
      tabIndex={0}
      onBlur={() => toggle(false)}
      ref={logOutRef}
    >
      <span
        className="hover:bg-hover-gray pl-5 pr-10 py-2 whitespace-nowrap "
        onClick={() => signOut(() => navigate("/"))}
      >
        Log out @{`${username}`}
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
