import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "@store/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject()

    }
};

export default authReducer;
