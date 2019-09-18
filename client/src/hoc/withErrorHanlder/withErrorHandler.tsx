import React, {Component} from "react";
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    interface State {

    }
    return class extends Component<State> {
        componentDidMount(): void {
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
                        show={(this.state as any).error}
                        modalClosed={this.errorConfirmedHandler}>
                        {(this.state as any).error
                            ? (this.state as any).error.message
                            : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;
