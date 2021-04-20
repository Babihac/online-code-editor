import { rootState } from "../redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;
