import React from "react";
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return (props: any) => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Auxiliary>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error
                        ? (error as any).message
                        : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Auxiliary>
        )
    }
};

export default withErrorHandler;
