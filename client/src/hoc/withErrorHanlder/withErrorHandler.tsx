import React, {useEffect, useState} from "react";
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import {AxiosRequestConfig, AxiosResponse} from "axios";

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return (props: any) => {
        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use((req: AxiosRequestConfig) => {
            setError(null);
            return req;
        });
        const responseInterceptor = axios.interceptors.response.use((res: AxiosResponse) => res, (err: any) => {
            setError(err)
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        }, [requestInterceptor, responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null)
        };

        return (
            <Auxiliary>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
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
