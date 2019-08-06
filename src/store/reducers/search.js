import * as actionTypes from '../actions/actionTypes';
import { updateObject, mergedSortedArrays } from '../../shared/utility';

const initialState = {
    jobsList: [],
    loading: true,
    err: null,
    userInfo: null 
};


const fetchJobsStart = ( state ) => {
    return updateObject( state, { 
        loading: true,
        jobsList: [],
        err: null,
    } );
};

const fetchJobsSuccess = ( state, action ) => {
    let jobsList = mergedSortedArrays(state.jobsList, action.jobsList);
    return updateObject( state, {
        jobsList: jobsList,
        loading: false
    } );
};

const fetchJobsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchUserDataSuccess = ( state, action ) => {
    return updateObject( state, { userInfo: action.userInfo } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_JOBS_START: return fetchJobsStart( state );
        case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess( state, action );
        case actionTypes.FETCH_JOBS_FAIL: return fetchJobsFail( state, action );
        case actionTypes.FETCH_USER_DATA_SUCCESS: return fetchUserDataSuccess(state, action);
        default: return state;
    }
};

export default reducer;