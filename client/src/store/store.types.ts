import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {AppState} from './app';

export interface RootState {
    app: AppState;
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;

