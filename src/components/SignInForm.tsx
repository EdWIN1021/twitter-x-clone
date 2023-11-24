import { useContext } from "react";
import TextInput from "./TextInput";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { StepperContext } from "./Stepper";

const SignInForm = () => {
  const { inputFields, setInputFields } = useContext(AuthContext);
  const { nextStep } = useContext(StepperContext);

  return (
    <div className="flex flex-col max-w-[300px] h-[580px] mx-auto items-center">
      <h2 className="text-[31px] font-bold  mt-3 mb-7 self-start">
        Sign in to X
      </h2>

      <div className="h-[38px] w-full text-[14px] my-3 border rounded-full border-[rgb(207,217,222)] flex justify-center items-center gap-2 mb-4 hover:bg-[rgba(29,155,240,0.1)] active:bg-[rgba(66,133,244,.1)]">
        <img
          src="/google.svg"
          alt="google-logo"
          className="w-[18px] h-[18px]"
        />
        <button className="font-medium text-[rgb(60,64,67)] ">
          Sign In with Google
        </button>
      </div>

      <div className=" h-[38px] w-full text-[14px] my-3 border rounded-full border-[rgb(207,217,222)] flex justify-center items-center gap-2 hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]">
        <img
          src="/github.svg"
          alt="google-logo"
          className="w-[18px] h-[18px]"
        />
        <button className="font-bold">Sign In with Github</button>
      </div>

      <div className="h-[20px] w-full relative flex items-center mb-3">
        <div className="border-t-[1px] border-[rgb(207,217,222)] w-full"></div>
        <div className="absolute bg-white top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[20px] text-center text-[17px]">
          or
        </div>
      </div>

      <TextInput
        label={"Email"}
        value={inputFields.email}
        id="email"
        name="email"
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />

      <button
        disabled={!inputFields.email}
        className={`text-white text-[15px] font-bold bg-[rgba(15,20,25,1)] rounded-full py-1.5 my-3 w-full cursor-pointer`}
        onClick={() => nextStep()}
      >
        Next
      </button>

      <button className="font-bold h-[40px] w-full text-[15px] border rounded-full border-[rgb(207,217,222)] my-3 flex justify-center items-center gap-2 hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]">
        Forgot password?
      </button>

      <p className="text-[rgb(83,100,113)] text-[15px] self-start mt-[40px]">
        Don't have an account?{" "}
        <Link className="text-[rgb(29,155,240)]" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
