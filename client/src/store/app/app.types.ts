export const START_FETCH_DATA = '[app] START_FETCH_DATA';
export const FINISH_FETCH_DATA = '[app] FINISH_FETCH_DATA';
export const CLEAR_INTERVAL = '[app] CLEAR_INTERVAL';
export const SET_DATA_FROM_DB = '[app] SET_DATA_FROM_DB';
export const ADD_DATA_TO_DB = '[app] ADD_DATA_TO_DB';
export const DELETE_DATA_FROM_DB = '[app] DELETE_DATA_FROM_DB';
export const UPDATE_DB_DATA = '[app] UPDATE_DB_DATA';

export type Data = {
    id: number,
    _id: string,
    message: string,
}

export interface AppState {
    data: Data,
    datas: Data[],
    message: string,
    intervalIsSet?: NodeJS.Timeout,
    idToDelete: number,
    idToUpdate: number,
    updateToApply: string
}
