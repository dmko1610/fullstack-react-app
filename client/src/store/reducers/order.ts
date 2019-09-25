import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utility";

export interface State {
    orders: [],
    loading: boolean,
    purchased: boolean
}

const initialState: State = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state: State, action: any) => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerStart = (state: State, action: any) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state: State, action: any) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state: State, action: any) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersStart = (state: State, action: any) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state: State, action: any) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = (state: State, action: any) => {
    return updateObject(state, {loading: false});
};

const orderReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default orderReducer;
