import React from "react";
// @ts-ignore
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const styles = {
    show: {
        transform: 'translateY(0)',
        opacity: 1
    } as React.CSSProperties,
    hide: {
        transform: 'translateY(100vh)',
        opacity: 0
    } as React.CSSProperties
};

const modal = (props: any) => (
    <Auxiliary>
        <Backdrop
            show={props.show}
            clicked={props.modalClosed}
        />
        <div
            className={classes.Modal}
            style={props.show ? styles.show : styles.hide}>
            {props.children}
        </div>
    </Auxiliary>
);
export default modal;
