import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    jobsList: [],
    loading: true,
};

const fetchJobsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchJobsSuccess = ( state, action ) => {
    return updateObject( state, {
        jobsList: action.jobsList,
        loading: false
    } );
};

const fetchJobsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_JOBS_START: return fetchJobsStart( state, action );
        case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess( state, action );
        case actionTypes.FETCH_JOBS_FAIL: return fetchJobsFail( state, action );
        default: return state;
    }
};

export default reducer;