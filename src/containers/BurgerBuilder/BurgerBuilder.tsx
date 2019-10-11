import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import {RouteComponentProps} from 'react-router-dom';
import {Ingredient} from '../../store/actions/actionTypes';
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHanlder/withErrorHandler";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: Ingredient,
    onIngredientAdded: any
    onIngredientRemoved: any,
    onInitIngredients: any,
    onInitPurchase: any,
    price: number,
    error: boolean,
    isAuthenticated: boolean,
    onSetAuthRedirectPath: any
}

interface IState {
    purchasing: boolean,
    loading: boolean,
}

export const BurgerBuilder = (props: ChildComponentProps) => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients()
    }, []);

    const updatePurchaseState = (ingredients: any) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...props.ings
    };
    for (let disabledInfoKey in disabledInfo) {
        (disabledInfo as any)[disabledInfoKey] = (disabledInfo as any)[disabledInfoKey] <= 0
    }
    let orderSummary = null;
    let burger = props.error
        ? <p>Ingredients can't be loaded</p>
        : <Spinner/>;
    if (props.ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    price={props.price}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}/>
            </Auxiliary>);
        orderSummary = (
            <OrderSummary
                price={props.price}
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>);
    }
    return (
        <Auxiliary>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

const mapStateToProps = (state: any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName: string) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
