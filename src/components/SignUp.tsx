import { XMarkIcon } from "@heroicons/react/24/solid";
import DropDown from "./DropDown";
import { monthData, dayData, yearData } from "../constants";
import TextInput from "./TextInput";
import { useMemo, useState } from "react";
import clsx from "clsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [step, setStep] = useState(1);

  const isDisabled = useMemo(() => year && day && month, [year, day, month]);

  return (
    <div className="bg-white w-[600px] p-4 rounded-2xl shadow-xl  justify-center ">
      <div>
        <div className="flex items-center gap-10">
          <XMarkIcon className="w-[20px] h-[20px]  left-[3%] top-[3%]" />

          <p className="text-xl font-bold ">Step 1 of 5</p>
        </div>

        {step === 1 && (
          <div className="flex flex-col max-w-[400px] mx-auto">
            <h2 className="text-[31px] font-bold my-7">Create your account</h2>

            <div className="flex flex-col gap-5">
              <TextInput
                label="Name"
                value={name}
                id={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />

              <TextInput
                label="Email"
                value={email}
                id={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <h3 className="text-[15px] font-bold mt-10 mb-2">Date of birth</h3>
            <p className="text-[rgb(83,100,113)] text-[14px]">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>

            <div className="flex mt-4 gap-3 ">
              <DropDown
                variant="lg"
                type="month"
                data={monthData}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <DropDown
                variant="sm"
                type="day"
                data={dayData}
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              <DropDown
                variant="md"
                type="year"
                data={yearData}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <button
              className={clsx(
                "text-white text-[17px] font-bold bg-[rgba(15,20,25,0.5)] rounded-full py-3.5 mt-20 mb-2 w-full",
                {
                  "bg-[rgba(15,20,25,1)]": isDisabled,
                }
              )}
              onClick={() => setStep((step) => step + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
