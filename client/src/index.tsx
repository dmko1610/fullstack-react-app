import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducers';

// @ts-ignore
const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
const rootElement = document.getElementById('root');

ReactDOM.render(app, rootElement);

serviceWorker.register();
