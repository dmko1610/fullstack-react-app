import {ActionsUnion, createAction} from '../action-helpers';
import {Dispatch} from "redux";

export const CLEAR_INTERVAL = '[app] CLEAR_INTERVAL';
export const SET_DATA_FROM_DB = '[app] SET_DATA_FROM_DB';
export const ADD_DATA_TO_DB = '[app] ADD_DATA_TO_DB';
export const DELETE_DATA_FROM_DB = '[app] DELETE_DATA_FROM_DB';
export const UPDATE_DB_DATA = '[app] UPDATE_DB_DATA';

export const Actions = {
    clearInterval: () => createAction(CLEAR_INTERVAL),
    setDataFromDb: () => createAction(SET_DATA_FROM_DB),
    addDataToDb: () => createAction(ADD_DATA_TO_DB),
    deleteDataFromDb: () => createAction(DELETE_DATA_FROM_DB),
    updateDbData: () => createAction(UPDATE_DB_DATA)
};

export const Thunks = {
    clearInterval: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.clearInterval());
        };
    },
    setDataFromDb: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.setDataFromDb());
        };
    },
    addDataToDb: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.addDataToDb());
        };
    },
    deleteDataFromDb: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.deleteDataFromDb());
        };
    },
    updateDbData: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.updateDbData());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
