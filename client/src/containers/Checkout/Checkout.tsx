import React, {Component} from "react";
import {Route, RouteComponentProps} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
import {State} from "../../store/reducers/burgerBuilder";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: {}
}

class Checkout extends Component<ChildComponentProps> {

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        ings: state.ingredients
    }
};

// @ts-ignore
export default connect(mapStateToProps)(Checkout);
