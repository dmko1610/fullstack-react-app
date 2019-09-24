import * as actionTypes from '../actions/actionTypes'
import {Ingredient} from '../actions/actionTypes'

export interface State {
    burgerBuilder: {
        ingredients: Ingredient | null,
        totalPrice: number
    },
    orders: [],
    order: {
        loading: boolean,
    },
    ingredients: {},
    totalPrice: number
}

const initialState: State = {
    burgerBuilder: {
        ingredients: null,
        totalPrice: 0
    },
    orders: [],
    order: {
        loading: false,
    },
    ingredients: {},
    totalPrice: 0
};

const reducer = (state: State = initialState, action: any) => {
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
                orders: Object.assign(state.orders, newOrder)
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

export default reducer;
