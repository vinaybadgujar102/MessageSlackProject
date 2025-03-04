import "quill/dist/quill.snow.css"; // ES6

import { ImageIcon, XIcon } from "lucide-react";
import Quill, { Delta, Op } from "quill";
import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";

import { Button } from "@/components/ui/button";

import { Hint } from "../Hint/Hint";

type EditorProps = {
  onSubmit: (data: { body: string; image: File | null }) => void;
};

export const Editor = ({ onSubmit }: EditorProps) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement>(null); // reqd to initialize the editor
  const defaultValueRef = useRef<Delta | Op[]>([]);
  const quillRef = useRef<Quill | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);
    if (!containerRef.current) return;
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden");
    }
  }

  useEffect(() => {
    if (!containerRef.current) return; // if containerRef is not initialized, return

    const container = containerRef.current; // get the container element

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    ); // create a new div element and append it to the container

    const options = {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n"); // insert a new line
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white ">
        <div className="h-full ql-custom" ref={containerRef} />
        {image && (
          <div className="p-2">
            <div className="relative size-[60px] flex items-center justify-center group/image">
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                onClick={() => {
                  setImage(null);
                  if (!imageInputRef.current) return;
                  imageInputRef.current.value = "";
                }}
              >
                <XIcon className="size-4" />
              </button>
              <img
                src={URL.createObjectURL(image)}
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={!isToolbarVisible ? "Show toolbar" : "Hide toolbar"}
            side="bottom"
            align="center"
          >
            <Button
              size="icon"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Image" align="center" side="bottom">
            <Button
              size="icon"
              variant="ghost"
              disabled={false}
              onClick={() => {
                if (!imageInputRef.current) return;
                imageInputRef.current.click();
              }}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => {
              if (!e.target.files?.length) return;
              setImage(e.target.files[0]);
            }}
          />

          <Hint label="Send Message" align="center" side="bottom">
            <Button
              size="icon"
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={() => {
                const messageContent = JSON.stringify(
                  quillRef.current?.getContents()
                );
                onSubmit({ body: messageContent, image });
                quillRef.current?.setText("");
                setImage(null);
                if (!imageInputRef.current) return;
                imageInputRef.current.value = "";
              }}
              disabled={false}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>

      <p className="p-2 text-[10px] text-mutes-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
