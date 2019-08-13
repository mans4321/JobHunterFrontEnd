import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../../shared/utility';

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
    let jobsList = mergedSortedJobs(state.jobsList, action.jobsList);
    jobsList = filterSortedJobs(jobsList);
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

const mergedSortedJobs = (a, b) => {

    let mergedArray = [], i = 0, j = 0;
    while(i < a.length && j < b.length) {
        if(Math.trunc(a[i].score * 100) > Math.trunc(b[j].score * 100) ){
            mergedArray.push(a[i]);
            i++;
        } else {
            mergedArray.push(b[j]);
            j++;
        }
    }

    while(i < a.length) {
        mergedArray.push(a[i]);
        i++;
    }

    while(j < b.length) {
        mergedArray.push(b[j]);
        j++;
    }

    return mergedArray;
}

const filterSortedJobs = jobList => {
    let arr = [] , i = 0;
    arr.push(jobList[0]);

    while(i < jobList.length){
        let j = i + 1;
        while(j < jobList.length && isEquals(jobList[i], jobList[j])){
            j++;
        }
        if(j < jobList.length)
            arr.push(jobList[j]);
        i = j;
    }
    return arr;
}

const isEquals = (jobDes1 , jobDes2) =>{
    return jobDes1.title === jobDes2.title
             && jobDes1.company === jobDes2.company 
                && Math.trunc(jobDes1.score * 100) === Math.trunc(jobDes2.score * 100);
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