import React, {Component} from "react";
import {RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

interface ChildComponentProps extends RouteComponentProps<any> {
}

class Checkout extends Component<ChildComponentProps> {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    };

    componentDidMount(): void {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        // @ts-ignore
        for (let param of query.entries()) {
            // @ts-ignore
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
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
                    checkoutContinued={this.checkoutContinuedHandler}
                />
            </div>
        );
    }
}

export default Checkout;
