import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
  PhotoIcon,
  FaceSmileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { XCircleIcon } from "@heroicons/react/24/solid";

import clsx from "clsx";
import EmojiModal from "./EmojiModal";

const PostForm = () => {
  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, toggle] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [input]);

  console.log(fileInputRef);

  const handleEmoji = (emojiObject: { emoji: string }) => {
    setInput((pre) => pre + emojiObject.emoji);
    toggle(false);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <form className="flex p-4 border-b" onSubmit={handleSubmit}>
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
            className="outline-none  overflow-hidden resize-none w-full text-xl pb-9"
            placeholder="What is happening?!"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          {imageUrl && (
            <div className="w-full h-[382px] rounded-2xl overflow-hidden relative">
              <img className="w-full h-full" src={imageUrl} alt="" />

              <XCircleIcon
                className="absolute top-[1%] w-8 right-[1%] cursor-pointer"
                onClick={() => {
                  fileInputRef.current!.value = "";
                  setImageUrl("");
                }}
              />
            </div>
          )}

          <div className="flex items-center mt-4 py-2 relative border-t">
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
              ref={fileInputRef}
            />

            <div className="flex-1 flex">
              <div
                className="p-2 hover:bg-hover-gray rounded-full cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
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

      {open && <EmojiModal handleEmoji={handleEmoji} toggle={toggle} />}
    </>
  );
};

export default PostForm;
