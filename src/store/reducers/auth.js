import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userID: null,
    authError: null,
    resetError: null,
    loading: false,
    emailSent: false
};

const authStart = ( state, action ) => {
    return updateObject( state, { authError: null, loading: true , userID: null} );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        userID: action.userID,
        authError: null,
        loading: false,
        
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        authError: action.error,
        loading: false
    });
};

const resetPasswordInit = ( state, action ) => {
    return updateObject( state, { 
                        resetError: null, 
                        loading: false,
                        emailSent: false} );
};

const resetPasswordStart = ( state, action ) => {
    return updateObject( state, { 
                        resetError: null, 
                        loading: true,
                        emailSent: false} );
};

const resetPasswordSuccess = (state, action) => {
    return updateObject( state, { 
        emailSent: true,
        resetError: null,
        loading: false
     } );
};

const resetPasswordFail = (state, action) => {
    return updateObject( state, {
        resetError: action.error,
        loading: false,
        emailSent: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {userID: null});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.RESET_PASSWORD_START: return resetPasswordStart(state, action);
        case actionTypes.RESET_PASSWORD_SUCCESS: return resetPasswordSuccess(state, action);
        case actionTypes.RESET_PASSWORD_FAIL: return resetPasswordFail(state, action);
        case actionTypes.RESET_PASSWORD_INIT: return resetPasswordInit(state, action)
        default:
            return state;
    }
};

export default reducer;