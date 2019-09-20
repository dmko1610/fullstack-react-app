import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
// @ts-ignore
import classes from './ContactData.css';
import {AxiosError, AxiosResponse} from "axios";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {RouteComponentProps} from "react-router";
import Input from '../../../components/UI/Input/Input';

interface ChildComponentProps extends RouteComponentProps<any> {
    ingredients: {},
    totalPrice: number
}

interface State {
    orderForm: {},
    totalPrice: number,
    loading: boolean,
}

class ContactData extends Component<ChildComponentProps, State> {
    state: State = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        totalPrice: 0,
        loading: false,
    };

    orderHandler = (event: any) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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

    inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...(updatedOrderForm as any)[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        (updatedOrderForm as any)[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: (this.state.orderForm as any)[key]
            })
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event: any) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
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
