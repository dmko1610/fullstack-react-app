import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Orders from "./containers/Orders/Orders";
import {Auth} from './containers/Auth/Auth'
import {Logout} from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux';
import * as actions from './store/actions/index'

interface IProps {
    onTryAutoSignup: any,
    isAuthenticated: boolean
}

class App extends Component<IProps> {

    componentDidMount(): void {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/auth" component={Auth}/>
                <Redirect to="/" />
            </Switch>
        );
        console.log(this.props.isAuthenticated)
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/checkout" component={Checkout}/>
                </Switch>
            )
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
