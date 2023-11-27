import { useMemo, useContext, ChangeEvent } from "react";

import TextInput from "../ui/TextInput";
import DropDown from "../ui/DropDown";
import { StepperContext } from "../ui/Stepper";
import { monthData, dayData, yearData } from "../constants";
import { AuthContext } from "../contexts/AuthContext";

const SignUpForm = () => {
  const { nextStep } = useContext(StepperContext);
  const { inputFields, setInputFields } = useContext(AuthContext);

  const { name, email, year, month, day } = inputFields;
  const isDisabled = useMemo(
    () => !year || !day || !month || !name || !email,
    [year, day, month, email, name]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col max-w-[400px] mx-auto">
      <h2 className="text-[31px] font-bold my-7">Create your account</h2>

      <div className="flex flex-col gap-5">
        <TextInput
          label="Name"
          value={name}
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
        />

        <TextInput
          label="Email"
          value={email}
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
        />
      </div>

      <h3 className="text-[15px] font-bold mt-10 mb-2">Date of birth</h3>
      <p className="text-[rgb(83,100,113)] text-[14px]">
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </p>

      <div className="flex mt-4 gap-3 ">
        <DropDown
          variant="lg"
          type="Month"
          name="month"
          data={monthData}
          value={month}
          onChange={handleChange}
        />
        <DropDown
          variant="sm"
          type="Day"
          name="day"
          data={dayData}
          value={day}
          onChange={handleChange}
        />
        <DropDown
          variant="md"
          type="Year"
          name="year"
          data={yearData}
          value={year}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => nextStep()}
        disabled={isDisabled}
        className={`text-white text-[17px] font-bold ${
          isDisabled ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
        }  rounded-full py-3.5 mt-20 mb-2 w-full cursor-pointer`}
      >
        Next
      </button>
    </div>
  );
};

export default SignUpForm;
