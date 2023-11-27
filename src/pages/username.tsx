import { useState } from "react";
import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import TextInput from "../ui/TextInput";
import Typography from "../ui/Typography";

const Username = () => {
  const [input, setInput] = useState("");

  return (
    <>
      <Overlay />
      <Modal showCloseButton={false}>
        <form className="p-10">
          <Typography variant="h2" title="What Should we call you?" />

          <Typography
            variant="p"
            title="Your @username is unique. You can always change it later."
          />

          <TextInput
            className="my-8"
            label="Username"
            id="username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            showLength={false}
          />

          <button
            disabled={!!input}
            className={`text-white text-[17px] font-bold ${
              !input ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
            }  rounded-full py-3.5 mt-[327px] mb-2 w-full cursor-pointer`}
          >
            Confirm
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Username;
