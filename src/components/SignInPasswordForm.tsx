import { useContext } from "react";
import TextInput from "./TextInput";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const SignInPasswordForm = () => {
  const { inputFields, setInputFields, signIn } = useContext(AuthContext);
  const { password, email } = inputFields;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col max-w-[400px] mx-auto">
      <h2 className="text-[31px] font-bold mt-7 ">Enter your password</h2>

      <div className="my-3">
        <TextInput
          disabled={true}
          label="Email"
          id="email"
          value={email}
          type="text"
        />
      </div>

      <PasswordInput
        className="my-3"
        value={password}
        name="password"
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />

      <Link to="/">
        <span className="text-[13px] text-[rgb(29,155,240)]">
          Forgot password?
        </span>
      </Link>

      <button
        onClick={() => signIn(() => navigate("/home"))}
        className={`text-white text-[17px] font-bold ${
          !password ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
        }  rounded-full py-3.5 mb-2 w-full cursor-pointer mt-[200px]`}
      >
        Log In
      </button>

      <p className="text-[rgb(83,100,113)] text-[15px] self-start m-[10px]">
        Don't have an account?{" "}
        <Link className="text-[rgb(29,155,240)]" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPasswordForm;
