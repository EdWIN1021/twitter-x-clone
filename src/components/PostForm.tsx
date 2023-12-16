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
import Skeleton from "react-loading-skeleton";

const PostForm = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: "Post" | "Reply";
}) => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, toggle] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useContext(AuthContext);
  const smileRef = useRef<HTMLDivElement>(null);

  const [leftPosition, setLeftPosition] = useState(0);

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const divElement = smileRef.current;
        if (divElement) {
          const rect = divElement.getBoundingClientRect();
          const currentLeft = rect.left;
          setLeftPosition(currentLeft);
        }
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEmoji = (emojiObject: { emoji: string }) => {
    setContent((pre) => pre + emojiObject.emoji);
    toggle(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (currentUser) {
      // type or reply
      const postRes = await createPost(
        currentUser?.uid,
        content,
        currentUser?.displayName,
        currentUser?.photoURL,
        currentUser?.username,
      );

      if (
        fileInputRef.current?.files &&
        fileInputRef.current?.files.length > 0
      ) {
        const storageRef = ref(storage, `posts/${postRes?.id}`);
        const uploadRes = await uploadBytes(
          storageRef,
          fileInputRef?.current?.files[0],
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
      <form
        className="hidden border-b px-4 pt-4 sm:flex"
        onSubmit={handleSubmit}
      >
        <div className="mr-3 w-10 cursor-pointer">
          {currentUser ? (
            <img
              className="rounded-full"
              src={currentUser?.photoURL || "/default_profile.png"}
              alt="default..."
            />
          ) : (
            <Skeleton circle width={40} height={40} />
          )}
        </div>

        <div className="flex-1">
          <textarea
            ref={textAreaRef}
            className="w-full  resize-none overflow-hidden pb-9 text-xl outline-none"
            placeholder={placeholder}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {imageUrl && (
            <div className="relative h-[382px] w-full overflow-hidden rounded-2xl">
              <img
                className="h-full w-full object-cover"
                src={imageUrl}
                alt=""
              />

              <XCircleIcon
                className="absolute right-[1%] top-[1%] w-8 cursor-pointer"
                onClick={() => {
                  fileInputRef.current!.value = "";
                  setImageUrl("");
                }}
              />
            </div>
          )}

          <div className="mt-4 flex items-center border-t py-2">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
              ref={fileInputRef}
            />

            <div className="flex flex-1">
              <div
                className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
                onClick={() => fileInputRef.current?.click()}
              >
                <PhotoIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
              </div>
              <div
                ref={smileRef}
                className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
                onClick={() => toggle(true)}
              >
                <FaceSmileIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
              </div>

              <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
                <MapPinIcon className="w-5 stroke-primary-blue stroke-[2.5px] opacity-50" />
              </div>
            </div>

            <button
              disabled={!content}
              className={clsx(
                "rounded-full bg-primary-blue px-4 py-1.5 font-bold text-white",
                { "opacity-50": !content },
              )}
            >
              {type}
            </button>
          </div>
        </div>
      </form>

      {open && (
        <EmojiModal
          leftPosition={leftPosition}
          handleEmoji={handleEmoji}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default PostForm;
