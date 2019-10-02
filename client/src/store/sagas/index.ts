import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'
import {authCheckStateSaga, authUserSaga, checkAuthTimeout, logoutSaga} from './auth'
import {initIngredientsSaga} from "../sagas/burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "../sagas/order";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
    ])

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}
