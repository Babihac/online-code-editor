import MDEditor from "@uiw/react-md-editor";
import React, { FC, useState, useEffect, useRef } from "react";
import "./textEditor.css";
const TextEditor: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("# Header");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  });
  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={value}
          onChange={(v) => setValue(v || "")}
          className="text-editor"
        />
      </div>
    );
  }

  return (
    <div className="card text-editor" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
