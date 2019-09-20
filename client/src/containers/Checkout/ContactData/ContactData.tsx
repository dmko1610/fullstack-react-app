import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
// @ts-ignore
import classes from './ContactData.css';
import {AxiosError, AxiosResponse} from "axios";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {RouteComponentProps} from "react-router";

interface ChildComponentProps extends RouteComponentProps<any> {
    ingredients: {},
    totalPrice: number
}

interface Props {
    ingredients: {},
    totalPrice: number
}

interface State {
    name: string,
    email: string,
    address: {}
    ingredients: {
        salad: number,
        meat: number,
        cheese: number,
        bacon: number
    },
    totalPrice: number,
    loading: boolean,
}


class ContactData extends Component<ChildComponentProps, State> {
    state: State = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 0,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    };

    orderHandler = (event: any) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dmitry Kovalev',
                address: {
                    street: 'BLahblab',
                    zipCode: '443554',
                    country: 'Russia'
                },
                email: 'mister-trigger@yandex.ru'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then((response: AxiosResponse) => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch((error: AxiosError) => {
                this.setState({loading: false})
            });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
