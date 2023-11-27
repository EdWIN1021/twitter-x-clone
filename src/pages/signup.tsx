import Stepper, { Step } from "../ui/Stepper";
import SignUpForm from "../components/SignUpForm";
import SignUpPasswordForm from "../components/SignUpPasswordForm";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";

const SignUp = () => {
  return (
    <>
      <Overlay />
      <Stepper>
        <Modal>
          <Step index={1}>
            <SignUpForm />
          </Step>
          <Step index={2}>
            <SignUpPasswordForm />
          </Step>
        </Modal>
      </Stepper>
    </>
  );
};

export default SignUp;
