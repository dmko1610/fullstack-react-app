import * as actionTypes from '../actions/actionTypes'
import {Ingredient} from '../actions/actionTypes'

export interface State {
    ingredients: Ingredient | null,
    totalPrice: number
    orders: [],
    loading: boolean,
}

const initialState: State = {
    ingredients: null,
    totalPrice: 0,
    orders: [],
    loading: false,
};

const orderReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default orderReducer;
