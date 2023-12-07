import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction } from "react";

const EmojiModal: React.FC<{
  handleEmoji: (emojiObject: { emoji: string }) => void;
  toggle: Dispatch<SetStateAction<boolean>>;
  leftPosition: number;
}> = ({ handleEmoji, toggle, leftPosition }) => {
  console.log(leftPosition);

  return createPortal(
    <>
      <div
        className={`absolute top-0 h-full w-full bg-transparent`}
        onClick={() => toggle(false)}
      ></div>

      <div
        className="absolute  top-[210px] flex-col items-center justify-center"
        style={{ left: leftPosition }}
      >
        <EmojiPicker
          width={320}
          height={440}
          onEmojiClick={handleEmoji}
          autoFocusSearch={false}
        />
      </div>
    </>,
    document.body,
  );
};

export default EmojiModal;
