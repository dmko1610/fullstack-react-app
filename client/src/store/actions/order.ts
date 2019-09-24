import * as actionTypes from './actionTypes';
import {Dispatch} from "redux";
import axios from '../../axios-orders';
import {AxiosError, AxiosResponse} from "axios";

export const purchaseBurgerSuccess = (id: number, orderData: {}) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error: AxiosError) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = (orderData: {}) => {
    return (dispatch: Dispatch) => {
        axios.post('/orders.json', orderData)
            .then((response: AxiosResponse) => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch((error: AxiosError) => {
                dispatch(purchaseBurgerFail(error))
            });
    }
};
