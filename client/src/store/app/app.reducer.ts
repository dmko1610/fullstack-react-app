import * as appActions from './app.actions';
import {CLEAR_INTERVAL, FETCH_DATA} from './app.types';
import {AppState} from "./app.types";

const initialState: AppState = {
    data: {
        id: 0,
        _id: '',
        message: ''
    },
    message: '',
    intervalIsSet: setInterval(() => {
    }, 1000),
    idToDelete: 0,
    idToUpdate: 0,
    updateToApply: ''
};

export const appReducer = (
    state = initialState,
    action: appActions.ActionsWithPayload
): AppState => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: action.payload
            };
        case CLEAR_INTERVAL:
            return {
                ...state,
                intervalIsSet: undefined
            };
        default:
            return state;
    }
};
