import * as actionTypes from './actions';

const initialState = {
    isAuthorized: false,
    userId: null,
    token: null,
    email: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_AUTHORIZATON:
            return {
                ...state,
                isAuthorized: true,
                userId: action.userId,
                token: action.token,
                email: action.email
            }
        case actionTypes.REMOVE_AUTHORIZATON:
            return {
                ...state,
                isAuthorized: false,
                userId: null,
                token: null,
                email: null
            }
        default:
            return state
    }
};

export default reducer;