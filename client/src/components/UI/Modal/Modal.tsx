import React, {Component} from "react";
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
    show: boolean,
    modalClosed: any,
    children?: React.ReactNode
}

interface State {
    error: any,

}

class Modal extends Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
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
