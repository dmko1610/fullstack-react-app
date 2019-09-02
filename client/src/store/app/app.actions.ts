import {ActionsUnion, createAction} from '../action-helpers';
import {Dispatch} from 'redux';
import {
    ADD_DATA_TO_DB,
    CLEAR_INTERVAL,
    DELETE_DATA_FROM_DB,
    FETCH_DATA,
    PAYLOAD_DATA,
    SET_DATA_FROM_DB,
    UPDATE_DB_DATA
} from "./app.types";

export const ActionsWithPayload = {
    fetchData: () => createAction(FETCH_DATA, PAYLOAD_DATA),
    clearInterval: () => createAction(CLEAR_INTERVAL),
    setDataFromDb: () => createAction(SET_DATA_FROM_DB),
    addDataToDb: () => createAction(ADD_DATA_TO_DB),
    deleteDataFromDb: () => createAction(DELETE_DATA_FROM_DB),
    updateDbData: () => createAction(UPDATE_DB_DATA)
};

export const Thunks = {
    getData: () => {
        return (dispatch: Dispatch) => {
            // fetch('http://localhost:3001/api/getData')
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((res) => res.json())
                .then((data) => dispatch({
                    type: FETCH_DATA,
                    payload: data
                }));
        }
    }
};

export type ActionsWithPayload = ActionsUnion<typeof ActionsWithPayload>;
export type Thunks = ActionsUnion<typeof Thunks>;
