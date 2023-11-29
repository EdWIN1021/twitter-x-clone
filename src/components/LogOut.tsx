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
      className="absolute top-[-110%] z-50  cursor-pointer rounded-xl bg-white px-2 py-3 text-[15px] font-bold shadow-[0_0_15px_rgba(101,119,134,0.2)] outline-none"
      tabIndex={0}
      onBlur={() => toggle(false)}
      ref={logOutRef}
    >
      <span
        className="whitespace-nowrap py-2 pl-5 pr-10 hover:bg-hover-gray "
        onClick={() => signOut(() => navigate("/"))}
      >
        Log out @{`${username}`}
      </span>
      <img
        src="/triangle.svg"
        className="absolute -bottom-[8px] left-1/2 -z-10 w-5 -translate-x-1/2 rotate-180"
        alt=""
      />
    </div>
  );
};

export default LogOut;
