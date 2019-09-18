import React from "react";
// @ts-ignore
import classes from './Button.css';

const button = (props: any) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;
