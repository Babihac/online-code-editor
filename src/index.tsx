import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDom from "react-dom";
//import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";
import { Provider } from "react-redux";
import { store } from "./redux";
import CellList from "./components/cellList/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
