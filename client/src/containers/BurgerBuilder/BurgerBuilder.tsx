import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHanlder/withErrorHandler";
import {RouteComponentProps} from "react-router-dom";
import {Ingredient} from "../../store/reducers";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: Ingredient,
    onIngredientAdded: any
    onIngredientRemoved: any,
    price: number
}

interface State {
    totalPrice: number,
    ingredients: Ingredient | null
    purchasable: boolean,
    purchasing: boolean,
    loading: boolean,
    error: boolean
}

class BurgerBuilder extends Component<ChildComponentProps> {
    state: State = {
        totalPrice: 0,
        ingredients: null,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(): void {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                    this.setState({error: true});
                }
            );
    }

    updatePurchaseState(ingredients: any) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent((this.props.ings as any)[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        let burger = this.state.error
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
                        purchasable={this.state.purchasable}
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
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName: string) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
