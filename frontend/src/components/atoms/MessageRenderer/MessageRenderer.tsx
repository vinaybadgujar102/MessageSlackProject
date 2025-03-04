import Quill from "quill";
import { useEffect, useRef, useState } from "react";

export const MessageRenderer = ({ value }: { value: string }) => {
  const rendererRef = useRef<HTMLDivElement>(null);

  const [isEmpty, setIsEmpty] = useState(true);

  console.log(isEmpty);

  useEffect(() => {
    if (!rendererRef.current) return;

    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
    });

    // disable editing
    quill.disable();
    const content = JSON.parse(value);
    quill.setContents(content);

    const isContentEmpty = quill.getText().trim().length === 0;
    setIsEmpty(isContentEmpty);

    rendererRef.current.innerHTML = quill.root.innerHTML;
  }, [value]);

  return (
    <div ref={rendererRef} className="ql-editor ql-renderer">
      <p>{value}</p>
    </div>
  );
};
