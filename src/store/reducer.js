import * as actionTypes from './actionTypes';
import { updateObject } from '../helpers/utility';


const initialState = {
    isAuthorized: false,
    userId: null,
    token: null,
    email: null
};

const authStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        isAuthorized: true,
        email: action.email
     } );
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, isAuthorized: false, email: null});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.ADD_AUTHORIZATON: return authSuccess(state, action)
        case actionTypes.REMOVE_AUTHORIZATON: return authLogout(state, action)
        default:
            return state
    }
};

export default reducer;