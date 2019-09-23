import * as actionTypes from './actions'

export type Ingredient = {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number
}


export interface State {
    ingredients: Ingredient | null,
    totalPrice: number,
    // purchasable: boolean,
    //     // purchasing: boolean,
    //     // loading: boolean,
    //     // error: boolean
}

const initialState: State = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1.4,
};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients as any)[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + (INGREDIENT_PRICES as any)[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients as any)[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - (INGREDIENT_PRICES as any)[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;
