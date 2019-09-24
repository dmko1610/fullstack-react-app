import * as actionTypes from '../actions/actionTypes'
import {AppState} from '../actions/actionTypes'

const initialState: AppState = {
    burgerBuilder: {
        ingredients: null,
        totalPrice: 0,
        error: false
    }
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1.4,
};

const reducer = (state: AppState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.burgerBuilder.ingredients,
                    [action.ingredientName]: (state.burgerBuilder.ingredients as any)[action.ingredientName] + 1
                },
                totalPrice: state.burgerBuilder.totalPrice + (INGREDIENT_PRICES as any)[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.burgerBuilder.ingredients,
                    [action.ingredientName]: (state.burgerBuilder.ingredients as any)[action.ingredientName] - 1
                },
                totalPrice: state.burgerBuilder.totalPrice - (INGREDIENT_PRICES as any)[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.burgerBuilder.ingredients,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
