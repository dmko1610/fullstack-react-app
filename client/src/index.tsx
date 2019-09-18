import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        <App/>,
        rootElement
    );
};

render();

serviceWorker.register();
