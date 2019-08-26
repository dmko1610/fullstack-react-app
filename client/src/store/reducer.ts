import {combineReducers, Reducer} from "redux";
import {RootState} from "./store.types";
import {appReducer} from "./app";

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    app: appReducer,
});
