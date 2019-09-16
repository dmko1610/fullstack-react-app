import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

export type Ingredient = {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number,
    type: string
}

interface State {
    ingredients: Ingredient,
    totalPrice: number
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1.4
};

class BurgerBuilder extends Component {
    state: State = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            type: ''
        },
        totalPrice: 4
    };

    addIngredientHandler = (type: string) => {
        // @ts-ignore
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // @ts-ignore
        updatedIngredients[type] = updatedCount;
        // @ts-ignore
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    };

    removeIngredientHandler = (type: string) => {
        // @ts-ignore
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // @ts-ignore
        updatedIngredients[type] = updatedCount;
        // @ts-ignore
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

    };

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
