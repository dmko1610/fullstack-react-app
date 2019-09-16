import React from "react";
// @ts-ignore
import classes from './Modal.css';

const styles = {
    show: {
        transform: 'translateY(0)',
        opacity: '1'
    },
    hide: {
        transform: 'translateY(100vh)',
        opacity: '0'
    }
};

const modal = (props: any) => (
    <div
        className={classes.Modal}
        >
        {props.children}
    </div>
);
export default modal;
