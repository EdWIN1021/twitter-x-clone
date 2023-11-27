import { useEffect, useRef, useState } from "react";
import MainTab from "./MainTab";
import EmojiPicker from "emoji-picker-react";

import {
  PhotoIcon,
  FaceSmileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const Main = () => {
  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRed = useRef<HTMLInputElement>(null);
  const [open, toggle] = useState(false);

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [input]);

  const handleEmoji = (emojiObject: { emoji: string }) => {
    setInput((pre) => pre + emojiObject.emoji);
    toggle(false);
  };

  return (
    <div className="w-[600px] justify-center border-x">
      <MainTab />
      <form className="flex p-4 border-b">
        <div className="w-10 cursor-pointer mr-3">
          <img
            className="rounded-full"
            src="/default_profile.png"
            alt="default..."
          />
        </div>

        <div className="flex-1">
          <textarea
            ref={textAreaRef}
            className="outline-none border-b overflow-hidden resize-none w-full text-xl pb-9"
            placeholder="What is happening?!"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          <div className="flex items-center mt-2 relative">
            <input type="file" className="hidden" ref={fileInputRed} />

            <div className="flex-1 flex">
              <div
                className="p-2 hover:bg-hover-gray rounded-full cursor-pointer"
                onClick={() => fileInputRed.current?.click()}
              >
                <PhotoIcon className="w-5 stroke-primary stroke-[2.5px]" />
              </div>
              <div
                className="p-2 hover:bg-hover-gray rounded-full cursor-pointer"
                onClick={() => toggle(true)}
              >
                <FaceSmileIcon className="w-5 stroke-primary stroke-[2.5px]" />
              </div>

              <div className="p-2 hover:bg-hover-gray rounded-full cursor-pointer">
                <MapPinIcon className="w-5 stroke-primary stroke-[2.5px] opacity-50" />
              </div>
              {open && (
                <div className="absolute bottom-[-1250%] left-[10%]">
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}
            </div>
            <button
              disabled={!input}
              className={clsx(
                "bg-primary text-white py-1.5 px-4 rounded-full font-bold ",
                { "opacity-50": !input }
              )}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Main;
