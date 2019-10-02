import * as actionTypes from './actionTypes';
import {Ingredient} from './actionTypes';
import {Dispatch} from 'redux';

export const addIngredient = (name: string) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name: string) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients: Ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        burgerBuilder: {
            ingredients: ingredients
        }
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return (dispatch: Dispatch) => {

    }
};
