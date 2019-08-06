import * as firebase from './firebase';
import * as authTypes from '../../shared/authType';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userID) => {
    localStorage.setItem('userID', userID);
    return {
        type: actionTypes.AUTH_SUCCESS,
        userID: userID
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const resetPasswordInit = () => {
    return {
        type: actionTypes.RESET_PASSWORD_INIT
    };
};

export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    };
};

export const resetPasswordSuccess = () => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS
    };
};

export const resetPasswordFail = (error) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('userID');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () =>{
    return dispatch => {
        const userID = localStorage.getItem('userID');
        if(userID){
            dispatch(authSuccess(userID));
        }else{
            dispatch(logout());
        }
    }
}

export const resstPassword = (email) =>{
    return dispatch => {
        dispatch(resetPasswordStart());
        firebase.resetPassword(email)
        .then( res => dispatch( resetPasswordSuccess()))
        .catch(err =>   dispatch((resetPasswordFail(err))));
    }
}

export const auth = (method, payload) => {
    return dispatch => {
        dispatch(authStart());
        switch(method){
            case authTypes.FACEBOOK_LOGIN: return facebookLogin(dispatch);
            case authTypes.GOOGLE_LOGIN: return googleLogin(dispatch);
            case authTypes.TWITTER_LOGIN: return twitterLogin(dispatch);
            case authTypes.USERNAME_PASSWORD_LOGIN: return usernamePasswordLogin(dispatch, payload);
            case authTypes.USERNAME_PASSWORD_SIGNUP: return usernamePasswordSignUp(dispatch, payload);
            default:return;
        }
    };
};

const facebookLogin = dispatch =>{
    firebase.app.auth().signInWithPopup(firebase.facebookProvider).then((res, err) => {
        err ?  dispatch(authFail(err)) : dispatch(authSuccess(res.user.uid));
    })
}

const googleLogin = dispatch =>{
    firebase.app.auth().signInWithPopup(firebase.googleProvider).then((res, err) => {
        err ?  dispatch(authFail(err)) : dispatch(authSuccess(res.user.uid));
    })
}

const twitterLogin = dispatch =>{
    firebase.app.auth().signInWithPopup(firebase.twitterProvider).then((res, err) => {
        err ?  dispatch(authFail(err)) : dispatch(authSuccess(res.user.uid));
    })
}

const usernamePasswordLogin = (dispatch, payload)=>{
    firebase.signInWithEmail(payload.email, payload.password)
    .then(res => dispatch(authSuccess(res.user.uid)))
    .catch(err =>  dispatch(authFail(err)))
}

const usernamePasswordSignUp = (dispatch, payload)=>{
    firebase.signupWithEmail(payload.email, payload.password)
    .then(res => dispatch(authSuccess(res.user.uid)))
    .catch(err =>  dispatch(authFail(err)));
}


