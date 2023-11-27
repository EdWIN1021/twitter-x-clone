import { useContext, useState } from "react";
import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import TextInput from "../ui/TextInput";
import Typography from "../ui/Typography";
import { AuthContext } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const Username = () => {
  const [input, setInput] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if (currentUser) {
        const usersRef = doc(db, "users", currentUser.uid);
        await updateDoc(usersRef, {
          username: input,
        });

        setCurrentUser({ ...currentUser, username: input });

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Overlay />
      <Modal showCloseButton={false}>
        <form className="p-10" onSubmit={handleSubmit}>
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
            required
          />

          <input type="text" />
          <button
            disabled={!input}
            type="submit"
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
