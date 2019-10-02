import {delay, put} from 'redux-saga/effects';
import * as actions from '../actions/index'

export function* logoutSaga(action: any) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeout(action: any) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}
