import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { ref, uploadBytes } from "firebase/storage";

import {
  PhotoIcon,
  FaceSmileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { XCircleIcon } from "@heroicons/react/24/solid";

import clsx from "clsx";
import EmojiModal from "./EmojiModal";
import { AuthContext } from "../contexts/AuthContext";
import { createPost } from "../utils/post";
import { db, storage } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const PostForm = () => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, toggle] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [content]);

  const handleEmoji = (emojiObject: { emoji: string }) => {
    setContent((pre) => pre + emojiObject.emoji);
    toggle(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (currentUser) {
      const postRes = await createPost(
        currentUser?.uid,
        content,
        currentUser?.displayName,
        currentUser?.photoURL,
        currentUser?.username
      );

      if (
        fileInputRef.current?.files &&
        fileInputRef.current?.files.length > 0
      ) {
        const storageRef = ref(storage, `posts/${postRes?.id}`);
        const uploadRes = await uploadBytes(
          storageRef,
          fileInputRef?.current?.files[0]
        );

        await updateDoc(doc(db, "posts", postRes?.id), {
          postImageUrl: `
          https://firebasestorage.googleapis.com/v0/b/twitter-clone-f5011.appspot.com/o/posts%2F${uploadRes.metadata.name}?alt=media&token=9a311874-bf9f-4118-9504-6f9a9952e230
          `,
        });
      }
    }

    setContent("");
    setImageUrl("");
    fileInputRef.current!.value = "";
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
            src={currentUser?.photoURL || "/default_profile.png"}
            alt="default..."
          />
        </div>

        <div className="flex-1">
          <textarea
            ref={textAreaRef}
            className="outline-none  overflow-hidden resize-none w-full text-xl pb-9"
            placeholder="What is happening?!"
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {imageUrl && (
            <div className="w-full h-[382px] rounded-2xl overflow-hidden relative">
              <img
                className="w-full h-full object-cover"
                src={imageUrl}
                alt=""
              />

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
              disabled={!content}
              className={clsx(
                "bg-primary text-white py-1.5 px-4 rounded-full font-bold ",
                { "opacity-50": !content }
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
