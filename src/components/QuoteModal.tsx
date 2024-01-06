import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";
import { getDateRange } from "../utils/date";
import {
  PhotoIcon,
  FaceSmileIcon,
  MapPinIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const QuoteModal: React.FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
  tweet: Tweet;
}> = ({ toggle, tweet }) => {
  const { profile } = useContext(AuthContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [content]);

  return createPortal(
    <>
      <Overlay toggle={toggle} />
      <div className="absolute left-1/2 top-[5%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white px-4 py-3">
        <XMarkIcon
          className="mb-8 mt-3 w-5 cursor-pointer"
          onClick={() => toggle(false)}
        />

        <div className="flex gap-4">
          <div className="w-10 cursor-pointer">
            <img
              className="rounded-full"
              src={profile?.avatar_url || "/default_profile.png"}
              alt="default..."
            />
          </div>
          <div className="flex-1">
            <textarea
              ref={textAreaRef}
              className="w-full resize-none overflow-hidden py-2 text-xl outline-none"
              placeholder={"Add a comment"}
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <div className="max-h-[150px] rounded-2xl border p-2">
              <div className="flex items-center gap-1">
                <div className="w-5 cursor-pointer">
                  <img
                    className="rounded-full"
                    src={tweet?.profiles?.avatar_url || "/default_profile.png"}
                    alt="default..."
                  />
                </div>

                <span className="font-bold">{tweet.profiles?.full_name}</span>
                <span className="text-label">
                  @{tweet.profiles?.username} &middot;{" "}
                  {getDateRange(new Date(tweet?.created_at))}
                </span>
              </div>

              <p>{tweet?.content}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 py-2 font-bold text-primary-blue">
          <GlobeAmericasIcon className="w-4 stroke-2" />
          <span className="text-sm">Everyone can reply</span>
        </div>

        <div className="flex items-center border-t ">
          <div className="mt-1.5 flex w-full">
            <div className="flex flex-1">
              <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
                <PhotoIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
              </div>
              <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
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
              Post
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default QuoteModal;
