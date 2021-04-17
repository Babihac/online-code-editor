import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
const middleware = applyMiddleware(thunk);
export const store = createStore(reducers, {}, middleware);

const state = store.getState();
state.cells.data;
