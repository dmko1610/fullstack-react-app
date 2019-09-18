import React, {Component} from "react";
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

interface Props {
    show: boolean,
    modalClosed: any,
}

class Modal extends Component<Props> {
    shouldComponentUpdate(nextProps: Props, nextState: any) {
        return nextProps.show !== this.props.show
    }

    componentDidUpdate(prevProps: Props, prevState: Readonly<{}>) {
        console.log('[Modal] did update');
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={this.props.show ? styles.show : styles.hide}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;
