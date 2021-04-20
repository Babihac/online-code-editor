import { combineReducers } from "redux";
import CellsReducer from "./cellsReducer";
import BundleReducer from "./bundlesReducer";
const reducers = combineReducers({
  cells: CellsReducer,
  bundles: BundleReducer,
});

export default reducers;

export type rootState = ReturnType<typeof reducers>;
