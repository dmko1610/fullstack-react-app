import React, {Component} from "react";
import {Route, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

interface ChildComponentProps extends RouteComponentProps<any> {
}

interface State {
    totalPrice: number,
    ingredients: {}
}

class Checkout extends Component<ChildComponentProps, State> {
    state: State = {
        ingredients: {},
        totalPrice: 0
    };

    componentWillMount(): void {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        // @ts-ignore
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                // @ts-ignore
                ingredients[param[0]] = +param[1];
            }
        }
        console.log('[Checkout] totalPrice = ', price);
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={
                        (props: any) => (
                            <ContactData
                                {...props}
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}/>
                        )
                    }/>
            </div>
        );
    }
}

export default Checkout;
