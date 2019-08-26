import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer} from './reducer'

const middleware = applyMiddleware(thunk);

export const store = createStore(reducer, {}, middleware);
// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('./reducer', () => {
        store.replaceReducer(require('./reducer').default);
    });
}
