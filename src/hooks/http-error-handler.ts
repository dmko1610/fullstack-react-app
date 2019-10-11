import {useEffect, useState} from 'react';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

export default (httpClient: any) => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use((req: AxiosRequestConfig) => {
        setError(null);
        return req;
    });
    const responseInterceptor = httpClient.interceptors.response.use((res: AxiosResponse) => res, (err: any) => {
        setError(err)
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        }
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null)
    };

    return [error, errorConfirmedHandler]
}
