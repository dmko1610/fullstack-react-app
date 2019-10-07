import React, {useState} from "react";
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
import {checkValidity, updateObject} from "../../../shared/utility";

interface ChildComponentProps extends RouteComponentProps<any> {
    ings: {},
    price: number,
    onOrderBurger: any,
    loading: boolean,
    token: string,
    userId: string
}

const ContactData = (props: ChildComponentProps) => {
    const [orderForm, setOrderForm] = useState({
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
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event: any) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            (formData as any)[formElementIdentifier] = (orderForm as any)[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedFormElement = updateObject((orderForm as any)[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, (orderForm as any)[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = (updatedOrderForm as any)[inputIdentifier].valid && formIsValid
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: (orderForm as any)[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event: any) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button
                btnType="Success"
                disabled={!formIsValid}>ORDER</Button>
        </form>);
    if (props.loading) {
        form = <Spinner/>;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: {}, token: string) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
