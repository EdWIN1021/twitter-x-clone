import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SignInOrUp = () => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4 lg:flex lg:flex-1 lg:items-center">
        <div className="flex flex-col p-5 md:mx-auto md:max-w-[568px] lg:min-w-full lg:flex-row lg:items-center">
          <div className="flex lg:flex-1 lg:justify-center">
            <img
              className="h-[45px] w-[57px] lg:h-[300px] lg:w-[300px]"
              src="/logo.svg"
              alt="x-logo"
            />
          </div>

          <div className="flex flex-col justify-center lg:basis-[55%] xl:basis-[50%] ">
            <h1 className="my-10 text-[40px] font-bold leading-[52px] tracking-[-0.8px] sm:text-[64px] sm:tracking-[-1.2px]">
              Happening now
            </h1>

            <h2 className="mb-5 text-2xl font-bold leading-7 sm:text-[31px]">
              Join today.
            </h2>

            <div>
              <div
                className="mb-4 flex h-[40px] w-[300px] items-center justify-center gap-2 rounded-full border border-[rgb(207,217,222)] text-[14px] hover:bg-[rgba(29,155,240,0.1)] active:bg-[rgba(66,133,244,.1)]"
                onClick={() => signInWithGoogle(() => navigate("/home"))}
              >
                <img
                  src="/google.svg"
                  alt="google-logo"
                  className="h-[18px] w-[18px]"
                />
                <button className="font-medium text-[rgb(60,64,67)] ">
                  Sign up with Google
                </button>
              </div>

              <div
                onClick={() => signInWithGithub(() => navigate("/home"))}
                className="flex h-[40px] w-[300px] items-center justify-center gap-2 rounded-full border border-[rgb(207,217,222)] text-[14px] hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]"
              >
                <img
                  src="/github.svg"
                  alt="google-logo"
                  className="h-[18px] w-[18px]"
                />
                <button className="font-bold">Sign up with Github</button>
              </div>

              <div className="relative my-1 flex h-[28px] w-[300px] items-center">
                <div className="w-full border-t-[1px] border-[rgb(207,217,222)]"></div>
                <div className="absolute left-1/2 top-1/2 w-[20px] -translate-x-2/4 -translate-y-2/4 bg-white text-center">
                  or
                </div>
              </div>

              <Link
                to="signup"
                className="bg-primary-blue hover:bg-dark-blue mb-2 flex h-[40px] w-[300px] items-center justify-center rounded-full px-4 text-[15px] font-bold leading-5 text-[rgb(255,255,255)]"
              >
                <span>Create account</span>
              </Link>
            </div>

            <p className="mb-4 w-[300px] text-[11px] text-[rgb(83,100,113)]">
              By signing up, you agree to the{" "}
              <span className="text-primary-blue cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and
              <span className="text-primary-blue cursor-pointer hover:underline">
                Privacy Policy
              </span>
              , including{" "}
              <span className="text-primary-blue cursor-pointer hover:underline">
                Cookie Use.
              </span>
            </p>

            <h2 className="mb-4 mt-10 text-[17px] font-bold leading-5">
              Already have an account?
            </h2>

            <Link
              to="signin"
              className="flex h-[40px] w-[300px] items-center justify-center rounded-full border border-[rgb(207,217,222)] px-4 text-[15px] font-bold leading-5 text-[rgb(29,155,240)] hover:bg-[rgba(29,155,240,0.1)]"
            >
              <span>Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInOrUp;
