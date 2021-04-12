import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDom from "react-dom";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import bundler from "./components/bundler";
const App = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initValue="//start coding"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
