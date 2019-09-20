import React from "react";
// @ts-ignore
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props: any) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
