import {createSelector} from "reselect/lib";
import {RootState} from "../store.types"

export const getApp = (state: RootState) => state.app;

export const getDataFromDb = createSelector(
    getApp,
    appState => appState.data
);
