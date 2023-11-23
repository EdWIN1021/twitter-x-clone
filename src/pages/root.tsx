import { Footer } from "../components/Footer";
import Overlay from "../components/Overlay";
import SignInOrUp from "../components/SignInOrUp";
import SignUp from "../components/SignUp";

const Root = () => {
  return (
    <>
      <div className="min-h-[100vh] lg:flex lg:flex-col">
        <SignInOrUp />
        <Footer />
      </div>
      <Overlay>
        <SignUp />
      </Overlay>
    </>
  );
};

export default Root;
