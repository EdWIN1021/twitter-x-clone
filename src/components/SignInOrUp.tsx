const SignInOrUp = () => {
  return (
    <div className="p-4 lg:flex-1 lg:flex lg:items-center">
      <div className="flex flex-col p-5 lg:flex-row md:max-w-[568px] md:mx-auto lg:min-w-full lg:items-center">
        <div className="lg:flex-1 flex lg:justify-center">
          <img
            className="w-[57px] h-[45px] lg:h-[300px] lg:w-[300px]"
            src="/logo.svg"
            alt="x-logo"
          />
        </div>

        <div className="lg:basis-[55%] xl:basis-[50%] flex flex-col justify-center ">
          <h1 className="text-[40px] font-bold leading-[52px] my-10 tracking-[-0.8px] sm:text-[64px] sm:tracking-[-1.2px]">
            Happening now
          </h1>

          <h2 className="text-2xl font-bold leading-7 mb-5 sm:text-[31px]">
            Join today.
          </h2>

          <div>
            <div className="w-[300px] h-[40px] text-[14px] border rounded-full border-[rgb(207,217,222)] flex justify-center items-center gap-2 mb-4 hover:bg-[rgba(29,155,240,0.1)] active:bg-[rgba(66,133,244,.1)]">
              <img
                src="/google.svg"
                alt="google-logo"
                className="w-[18px] h-[18px]"
              />
              <button className="font-medium text-[rgb(60,64,67)] ">
                Sign up with Google
              </button>
            </div>

            <div className="w-[300px] h-[40px] text-[14px] border rounded-full border-[rgb(207,217,222)] flex justify-center items-center gap-2 hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]">
              <img
                src="/github.svg"
                alt="google-logo"
                className="w-[18px] h-[18px]"
              />
              <button className="font-bold">Sign up with Github</button>
            </div>

            <div className="h-[28px] w-[300px] relative flex items-center my-1">
              <div className="border-t-[1px] border-[rgb(207,217,222)] w-full"></div>
              <div className="absolute bg-white top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[20px] text-center">
                or
              </div>
            </div>

            <button className="bg-[rgb(29,155,240)] text-[rgb(255,255,255)] text-[15px] font-bold leading-5 px-4 w-[300px] h-[40px] rounded-full mb-2 hover:bg-[rgb(26,140,216)]">
              Create account
            </button>
          </div>

          <p className="text-[rgb(83,100,113)] text-[11px] mb-4 w-[300px]">
            By signing up, you agree to the{" "}
            <span className="text-[rgb(29,155,240)] hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and
            <span className="text-[rgb(29,155,240)] hover:underline cursor-pointer">
              Privacy Policy
            </span>
            , including{" "}
            <span className="text-[rgb(29,155,240)] hover:underline cursor-pointer">
              Cookie Use.
            </span>
          </p>

          <h2 className="text-[17px] font-bold leading-5 mt-10 mb-4">
            Already have an account?
          </h2>

          <button className="text-[rgb(29,155,240)] border border-[rgb(207,217,222)] text-[15px] font-bold leading-5 px-4 w-[300px] h-[40px] rounded-full hover:bg-[rgba(29,155,240,0.1)]">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInOrUp;
