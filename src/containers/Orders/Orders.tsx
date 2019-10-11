import React, {useEffect} from "react";
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
    token: string,
    userId: string
}

const Orders = (props: IProps) => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders: any = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map((order: any) => (
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
};

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchOrders: (token: string, userId: string) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
