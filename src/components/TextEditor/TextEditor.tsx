import MDEditor from "@uiw/react-md-editor";
import React, { FC, useState, useEffect, useRef } from "react";
import { Cell } from "../../redux/cell";
import { useAction } from "../../hooks/useActions";
import "./textEditor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useAction();

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
  }, []);
  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
          className="text-editor"
        />
      </div>
    );
  }

  return (
    <div className="card text-editor" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit..."} />
      </div>
    </div>
  );
};

export default TextEditor;
