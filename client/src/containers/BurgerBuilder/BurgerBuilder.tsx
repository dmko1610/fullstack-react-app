import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import {RouteComponentProps} from "react-router-dom";
import {Ingredient, State} from "../../store/reducers/burgerBuilder";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHanlder/withErrorHandler";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: Ingredient,
    onIngredientAdded: any
    onIngredientRemoved: any,
    onInitIngredients: any,
    price: number,
    error: boolean
}

interface IState {
    purchasing: boolean,
    loading: boolean,
}

class BurgerBuilder extends Component<ChildComponentProps> {
    state: IState = {
        purchasing: false,
        loading: false,
    };

    componentDidMount(): void {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients: any) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let disabledInfoKey in disabledInfo) {
            (disabledInfo as any)[disabledInfoKey] = (disabledInfo as any)[disabledInfoKey] <= 0
        }
        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        let burger = this.props.error
            ? <p>Ingredients can't be loaded</p>
            : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>);
            orderSummary = (
                <OrderSummary
                    price={this.props.price}
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>);
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName: string) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
