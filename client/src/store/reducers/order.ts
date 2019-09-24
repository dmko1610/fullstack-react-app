import * as actionTypes from '../actions/actionTypes'

interface State {
    orders: [],
    loading: boolean
}

const initialState: State = {
    orders: [],
    loading: false,

};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat()
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {};
        default:
            return state;
    }
};

export default reducer;
