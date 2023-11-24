import React, { useState } from "react";
import TextInput from "./TextInput";

const PasswordForm = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col max-w-[400px] mx-auto">
      <h2 className="text-[31px] font-bold ">You'll need a password</h2>
      <p className="text-[rgb(83,100,113)] text-[14px] mb-7">
        Make sure it's 8 characters or more.
      </p>

      <TextInput
        label="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <button
        className={`text-white text-[17px] font-bold bg-[rgba(0,0,0,0.5)] mt-[355px] rounded-full py-3.5  mb-2 w-full cursor-pointer`}
        type="submit"
      >
        Next
      </button>
    </div>
  );
};

export default PasswordForm;
