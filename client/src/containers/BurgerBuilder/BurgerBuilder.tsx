import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

export type Ingredient = {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number
}

interface State {
    ingredients: Ingredient,
    totalPrice: number,
    purchasable: boolean,
    purchasing: boolean
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
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type: string) => {
        // @ts-ignore
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
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
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState(ingredients: any) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                // @ts-ignore
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () =>  {
        this.setState({purchasing: true});
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let disabledInfoKey in disabledInfo) {
            // @ts-ignore
            disabledInfo[disabledInfoKey] = disabledInfo[disabledInfoKey] <= 0
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
