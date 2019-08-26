import {createSelector} from "reselect/lib";
import {RootState} from "../store.types"

export const getApp = (state: RootState) => state.app;

export const clearInterval = createSelector(
    getApp,
    appState => appState.intervalIsSet,
);
