import React, {Component} from "react";
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: {},
    onInitPurchase: any,
    purchased: boolean
}

class Checkout extends Component<ChildComponentProps> {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    };

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>)
        }
        return summary
    }
}

const mapStateToProps = (state: any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


// @ts-ignore
export default connect(mapStateToProps)(Checkout);
