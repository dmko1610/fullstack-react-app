export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';

export type Ingredient = {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number
}

export interface AppState {
    burgerBuilder: {
        ingredients: Ingredient | null,
        totalPrice: number,
        error: boolean
    }
    ingredients: Ingredient | null,
    totalPrice: number,
    error: boolean
}
