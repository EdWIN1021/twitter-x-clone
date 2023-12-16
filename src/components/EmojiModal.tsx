import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction } from "react";

interface EmojiModalProps {
  handleEmoji: (emojiObject: { emoji: string }) => void;
  toggle: Dispatch<SetStateAction<boolean>>;
  leftPosition: number;
}

const EmojiModal: React.FC<EmojiModalProps> = ({
  handleEmoji,
  toggle,
  leftPosition,
}) => {
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
