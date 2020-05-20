import * as actionTypes from './actions';

const initialState = {
    isAuthorized: false,
    userId: null,
    token: null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_AUTHORIZATON: return  {
            ...state, 
            isAuthorized: true, 
            userId: action.userId, 
            token: action.token
        }
        case actionTypes.REMOVE_AUTHORIZATON: return {...state, isAuthorized: false }
        default: return state
    }
};

export default reducer;