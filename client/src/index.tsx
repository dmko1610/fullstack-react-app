import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
const rootElement = document.getElementById('root');

ReactDOM.render(app, rootElement);

serviceWorker.register();
