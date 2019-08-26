import * as appActions from './app.actions';
import {CLEAR_INTERVAL} from './app.actions';

export type Data = {
    id: number,
    _id: string,
    message: string,
}

export interface AppState {
    data: Data,
    message: string,
    intervalIsSet?: NodeJS.Timeout,
    idToDelete: number,
    idToUpdate: number,
    updateToApply: string
}

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
    action: appActions.Actions
): AppState => {
    switch (action.type) {
        case CLEAR_INTERVAL:
            return {
                ...state,
                intervalIsSet: undefined
            };
        default:
            return state;
    }
};
