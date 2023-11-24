import Stepper, { Step } from "../components/Stepper";
import SignUpForm from "../components/SignUpForm";
import SignUpPasswordForm from "../components/SignUpPasswordForm";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";

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
