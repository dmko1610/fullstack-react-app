import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'
import {authCheckStateSaga, authUserSaga, checkAuthTimeout, logoutSaga} from './auth'
import {initIngredientsSaga} from "../sagas/burgerBuilder";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
