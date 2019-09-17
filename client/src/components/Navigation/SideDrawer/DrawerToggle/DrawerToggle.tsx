import React from "react";
// @ts-ignore
import classes from './DrawerToggle.css';

const drawerToggle = (props: any) => (
    <div
        onClick={props.clicked}
        className={classes.DrawerToggle}>
        <div/>
        <div/>
        <div/>
    </div>
);

export default drawerToggle;
