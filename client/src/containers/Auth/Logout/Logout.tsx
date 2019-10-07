import React, {useEffect} from 'react';
import * as actions from '../../../store/actions/index'
import {RouteComponentProps} from 'react-router';
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";

interface ChildComponentProps extends RouteComponentProps<any> {
    onLogout: any
}

const LogoutComponent = (props: ChildComponentProps) => {
    useEffect(() => {
        props.onLogout()
    }, []);

    return <Redirect to="/"/>
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
};

export const Logout = connect(null, mapDispatchToProps)(LogoutComponent);
