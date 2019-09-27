import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
// @ts-ignore
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

interface State {
    showSideDrawer: boolean
}

interface IProps {
    isAuthenticated: boolean
}

class Layout extends Component<IProps> {
    state: State = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState: State) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);
