import React, {useEffect, useState} from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
// @ts-ignore
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import {checkValidity, updateObject} from "../../shared/utility";

interface IProps {
    onAuth: any,
    loading: boolean,
    error: any,
    isAuthenticated: boolean,
    buildingBurger: boolean,
    authRedirectPath: string,
    onSetAuthRedirectPath: any
}

const Auth = (props: IProps) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath()
        }
    }, []);

    const inputChangedHandler = (event: any, controlName: string) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject((authForm as any)[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, (authForm as any)[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls)
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp)
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: (authForm as any)[key]
        })
    }
    let form: any = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: any) => inputChangedHandler(event, formElement.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">
                    SUBMIT
                </Button>
            </form>
            <Button
                btnType="Danger"
                clicked={switchAuthModeHandler}>
                SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
            </Button>
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, isSignUp: boolean) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
