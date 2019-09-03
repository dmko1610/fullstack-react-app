import {ActionsUnion, createAction} from '../action-helpers';
import {Dispatch} from 'redux';
import {
    ADD_DATA_TO_DB,
    CLEAR_INTERVAL,
    Data,
    DELETE_DATA_FROM_DB,
    FINISH_FETCH_DATA,
    SET_DATA_FROM_DB,
    START_FETCH_DATA,
    UPDATE_DB_DATA
} from "./app.types";

export const ActionsWithPayload = {
    startFetchData: () => createAction(START_FETCH_DATA),
    finishFetchData: (data: Data[]) => createAction(FINISH_FETCH_DATA, data),
    clearInterval: () => createAction(CLEAR_INTERVAL),
    setDataFromDb: () => createAction(SET_DATA_FROM_DB),
    addDataToDb: () => createAction(ADD_DATA_TO_DB),
    deleteDataFromDb: () => createAction(DELETE_DATA_FROM_DB),
    updateDbData: () => createAction(UPDATE_DB_DATA)
};

export const Thunks = {
    getData: () => {
        console.log('Fetching is in progress...');
        return (dispatch: Dispatch) => {
            dispatch(ActionsWithPayload.startFetchData());
            // fetch('https://jsonplaceholder.typicode.com/posts')
            fetch('http://localhost:3001/api/getData')
                .then((response) => response.json())
                .then((data) => {
                    let arrayOfData: Data[] = data.data;
                    dispatch(ActionsWithPayload.finishFetchData(arrayOfData))
                    // Object.values(arrayOfData).map((dataElement: Data) => {
                    // });
                });
        }
    },
    addData: () => {
        return (dispatch: Dispatch) => {

        }
    }
};

export type ActionsWithPayload = ActionsUnion<typeof ActionsWithPayload>;
export type Thunks = ActionsUnion<typeof Thunks>;
