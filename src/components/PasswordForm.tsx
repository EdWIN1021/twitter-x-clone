import React, { useContext } from "react";
import TextInput from "./TextInput";
import { AuthContext } from "../contexts/AuthContext";

const PasswordForm = () => {
  const { signUpFields, setSignUpFields } = useContext(AuthContext);

  const { password } = signUpFields;

  return (
    <div className="flex flex-col max-w-[400px] mx-auto">
      <h2 className="text-[31px] font-bold mt-7 ">You'll need a password</h2>
      <p className="text-[rgb(83,100,113)] text-[14px] mb-7">
        Make sure it's 8 characters or more.
      </p>

      <TextInput
        label="password"
        id="password"
        value={password}
        name="password"
        onChange={(e) =>
          setSignUpFields({ ...signUpFields, [e.target.name]: e.target.value })
        }
        type="password"
      />

      <button
        className={`text-white text-[17px] font-bold bg-[rgba(0,0,0,0.5)] mt-[327px] rounded-full py-3.5  mb-2 w-full cursor-pointer`}
        type="submit"
      >
        Sign Up
      </button>
    </div>
  );
};

export default PasswordForm;
