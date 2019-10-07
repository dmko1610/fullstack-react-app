import React from "react";
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: {},
    purchased: boolean
}

const Checkout = (props: ChildComponentProps) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    };

    let summary = <Redirect to="/"/>;
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        console.log(props);
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>)
    }
    return summary
};

const mapStateToProps = (state: any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);
