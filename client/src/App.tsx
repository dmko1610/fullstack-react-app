import React, {Suspense, useEffect} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Logout} from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const App = (props: any) => {

    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Redirect to="/"/>
        </Switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                <Route path="/checkout" render={(props) => <Checkout {...props} />}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    )
};

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
