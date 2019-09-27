import * as actionTypes from '../actions/actionTypes'
import {AppState} from '../actions/actionTypes'
import {updateObject} from '../utility';

const initialState: AppState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1.4,
};

const addIngredient = (state: AppState, action: any) => {
    const updatedIngredient = {
        [action.ingredientName]: (state.ingredients as any)[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + (INGREDIENT_PRICES as any)[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state: AppState, action: any) => {
    const updatedIng = {
        [action.ingredientName]: (state.ingredients as any)[action.ingredientName] - 1
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - (INGREDIENT_PRICES as any)[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setIngredients = (state: AppState, action: any) => {
    return updateObject(
        state,
        {
            ingredients: action.burgerBuilder.ingredients,
            totalPrice: 4,
            error: false,
            building: false
        });
};

const fetchIngredientsFailed = (state: AppState, action: any) => {
    return updateObject(state, {error: true});
};

const burgerBuilderReducer = (state: AppState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default burgerBuilderReducer;
