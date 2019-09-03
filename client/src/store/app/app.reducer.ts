import * as appActions from './app.actions';
import {AppState, CLEAR_INTERVAL, FINISH_FETCH_DATA} from './app.types';

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
        case FINISH_FETCH_DATA:
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
