import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDom from "react-dom";
import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";
import { Provider } from "react-redux";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
