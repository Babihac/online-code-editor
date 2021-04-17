import ReactDom from "react-dom";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import bundler from "../../bundler";
import Resizable from "../Resizable/Resizable";
const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [error, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue="//start coding"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview error={error} code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
