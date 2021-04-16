import ReactDom from "react-dom";
import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
