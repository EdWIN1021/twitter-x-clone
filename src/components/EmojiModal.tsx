import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction } from "react";

const EmojiModal: React.FC<{
  handleEmoji: (emojiObject: { emoji: string }) => void;
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ handleEmoji, toggle }) => {
  return createPortal(
    <>
      <div
        className={`absolute bg-transparent top-0 w-full h-full`}
        onClick={() => toggle(false)}
      ></div>

      <div className="absolute left-[25%] top-[23%] flex-col justify-center items-center">
        <EmojiPicker
          width={320}
          height={440}
          onEmojiClick={handleEmoji}
          autoFocusSearch={false}
        />
      </div>
    </>,
    document.body
  );
};

export default EmojiModal;
