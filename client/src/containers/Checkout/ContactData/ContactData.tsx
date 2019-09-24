import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
// @ts-ignore
import classes from './ContactData.css';
import {connect} from 'react-redux'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {RouteComponentProps} from "react-router";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHanlder/withErrorHandler";
import * as actions from '../../../store/actions/index'
import {State} from "../../../store/reducers/order";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: {},
    price: number,
    onOrderBurger: any,
    loading: boolean
}

interface IState {
    orderForm: {},
    totalPrice: number,
    loading: boolean,
    formIsValid: boolean
}

class ContactData extends Component<ChildComponentProps, IState> {
    state: IState = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true,
                touched: false
            }
        },
        totalPrice: 0,
        loading: false,
        formIsValid: false
    };

    static checkValidity(value: string, rules: any) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    orderHandler = (event: any) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            (formData as any)[formElementIdentifier] = (this.state.orderForm as any)[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...(updatedOrderForm as any)[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = ContactData.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        (updatedOrderForm as any)[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = (updatedOrderForm as any)[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid);
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event: any) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if (this.props.loading) {
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

const mapStateToProps = (state: State) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: {}) => dispatch(actions.purchaseBurger(orderData))
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
