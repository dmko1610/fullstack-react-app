import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer} from './reducer'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const initialState = {};

export const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        composeEnhancers
    )
);
