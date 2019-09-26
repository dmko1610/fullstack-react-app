import React, {Component} from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHanlder/withErrorHandler";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

interface IProps {
    onFetchOrders: any,
    orders: any,
    loading: boolean,
    token: string
}

class Orders extends Component<IProps> {

    componentDidMount(): void {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders: any = <Spinner/>;
        if (!this.props.loading) {
            orders = this.props.orders.map((order: any) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchOrders: (token: string) => dispatch(actions.fetchOrders(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
