import React from "react";
// @ts-ignore
import classes from './BuildControl.css';

const buildControl = (props: any) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
);

export default buildControl;
