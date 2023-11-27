import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import SignInForm from "../components/SignInForm";
import SignInPasswordForm from "../components/SignInPasswordForm";
import Stepper, { Step } from "../ui/Stepper";

const SignIn = () => {
  return (
    <>
      <Overlay />
      <Stepper>
        <Modal>
          <Step index={1}>
            <SignInForm />
          </Step>
          <Step index={2}>
            <SignInPasswordForm />
          </Step>
        </Modal>
      </Stepper>
    </>
  );
};

export default SignIn;
