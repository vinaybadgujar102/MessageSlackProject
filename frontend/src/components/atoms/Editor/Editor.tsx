import "quill/dist/quill.snow.css"; // ES6

import { ImageIcon, XIcon } from "lucide-react";
import Quill, { Delta } from "quill";
import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Hint } from "../Hint/Hint";

interface EditorProps {
  onSubmit: (data: { body: string; image: File | null }) => void;
  defaultValue?: Delta;
}

export const Editor = ({ onSubmit, defaultValue }: EditorProps) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const defaultValueRef = useRef<Delta | undefined>(defaultValue);
  const quillRef = useRef<Quill | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);
    const toolbar = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden");
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

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
                const quill = quillRef.current;
                if (quill) {
                  quill.insertText(quill.getSelection()?.index || 0, "\n");
                }
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quill.focus();

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white">
        <div className="h-full ql-custom" ref={containerRef} />
        {image && (
          <div className="p-2">
            <div className="relative size-[60px] flex items-center justify-center group/image">
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                onClick={() => {
                  setImage(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }}
              >
                <XIcon className="size-4" />
              </button>
              <img
                src={URL.createObjectURL(image)}
                className="rounded-xl overflow-hidden border object-cover"
                alt="Uploaded content"
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
            <Button size="icon" variant="ghost" onClick={toggleToolbar}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Image" side="bottom" align="center">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                imageInputRef.current?.click();
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
              const file = e.target.files?.[0] || null;
              setImage(file);
            }}
            accept="image/*"
          />

          <Hint label="Send Message" side="bottom" align="center">
            <Button
              size="icon"
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={() => {
                if (quillRef.current) {
                  const messageContent = JSON.stringify(
                    quillRef.current.getContents()
                  );
                  onSubmit({ body: messageContent, image });
                  quillRef.current.setText("");
                  setImage(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }
              }}
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
