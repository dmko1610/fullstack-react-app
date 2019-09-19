import React, {Component} from "react";
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

type Error = {
    message?: string
}

interface IState {
    error: Error | null
}

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return class extends Component {
        state: IState = {
            error: null
        };

        componentDidMount(): void {
            console.log('[withErrorHandler] componentDidMount');
            axios.interceptors.request.use((req: AxiosRequestConfig) => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use((res: AxiosResponse) => res, (error: AxiosError) => {
                this.setState({error: error});
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error
                            ? this.state.error.message
                            : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;
