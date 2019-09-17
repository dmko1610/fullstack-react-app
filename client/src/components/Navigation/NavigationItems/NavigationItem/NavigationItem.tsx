import React from "react";
// @ts-ignore
import classes from './NavigationItem.css';

const navigationItem = (props: any) => (
    <li className={classes.NavigationItem}>
        <a
            href={props.link}
            className={props.active ? classes.active : null}
        >{props.children}</a>
    </li>
);

export default navigationItem;
