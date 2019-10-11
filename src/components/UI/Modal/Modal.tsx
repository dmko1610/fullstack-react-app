import React from "react";
// @ts-ignore
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
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

interface Props {
    show: any,
    modalClosed: any,
    children?: React.ReactNode
}

const modal = (props: Props) => {
    return (
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
};

export default React.memo(
    modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);
