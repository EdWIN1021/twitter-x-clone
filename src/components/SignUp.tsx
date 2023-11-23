import { XMarkIcon } from "@heroicons/react/24/solid";
import DropDown from "./DropDown";
import { monthData, dayData, yearData } from "../constants";

const SignUp = () => {
  return (
    <div className="bg-white w-[600px] p-4 rounded-2xl shadow-xl flex justify-center  relative">
      <XMarkIcon className="w-[20px] h-[20px] absolute left-[3%] top-[3%]" />

      <div className="max-w-[440px] flex flex-col">
        <p className="text-xl font-bold ">Step 1 of 5</p>

        <h2 className="text-[31px] font-bold my-7">Create your account</h2>

        <div>
          <input className="w-full h-[60px] border rounded-md" type="text" />
        </div>

        <div className="py-4">
          <input className="w-full  h-[60px] border rounded-md" type="email" />
        </div>

        <h3 className="text-[15px] font-bold mt-10 mb-2">Date of birth</h3>
        <p className="text-[rgb(83,100,113)] text-[14px]">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>

        <div className="flex mt-4 gap-3 ">
          <DropDown size="lg" type="month" data={monthData} />
          <DropDown size="sm" type="day" data={dayData} />
          <DropDown size="md" type="year" data={yearData} />
        </div>

        <button className="text-white text-[17px] font-bold bg-[rgba(15,20,25,0.5)] rounded-full py-3.5 mt-20 mb-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default SignUp;
