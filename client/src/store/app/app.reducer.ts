import * as appActions from './app.actions';
import {AppState, FETCH_DATA} from './app.types';

const initialState: AppState = {
    data: {
        id: 0,
        _id: '',
        message: ''
    },
    datas: [],
    message: '',
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
                datas: action.payload
            };
        default:
            return state;
    }
};
