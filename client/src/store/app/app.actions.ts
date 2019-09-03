import {ActionsUnion, createAction} from '../action-helpers';
import axios from 'axios';
import {Dispatch} from 'redux';
import {
    ADD_DATA_TO_DB,
    Data,
    DELETE_DATA_FROM_DB,
    FETCH_DATA,
    SET_DATA_FROM_DB,
    START_FETCH_DATA,
    UPDATE_DB_DATA
} from "./app.types";

export const ActionsWithPayload = {
    startFetchData: () => createAction(START_FETCH_DATA),
    finishFetchData: (data: Data[]) => createAction(FETCH_DATA, data),
    setDataFromDb: () => createAction(SET_DATA_FROM_DB),
    addDataToDb: () => createAction(ADD_DATA_TO_DB),
    deleteDataFromDb: () => createAction(DELETE_DATA_FROM_DB),
    updateDbData: () => createAction(UPDATE_DB_DATA)
};

export const Thunks = {
    getData: () => {
        console.log('Fetching is in progress...');
        return (dispatch: Dispatch) => {
            // fetch('https://jsonplaceholder.typicode.com/posts')
            fetch('http://localhost:3001/api/getData')
                .then((response) => response.json())
                .then((data) => {
                    let arrayOfData: Data[] = data.data;
                    dispatch(ActionsWithPayload.finishFetchData(arrayOfData))
                });
        }
    },
    addData: (message: string) => {
        console.info('Adding is in progress...');
        return (dispatch: Dispatch) => {

            axios.post('http://localhost:3001/api/putData', {

            })
        }
    }
};

export type ActionsWithPayload = ActionsUnion<typeof ActionsWithPayload>;
export type Thunks = ActionsUnion<typeof Thunks>;
