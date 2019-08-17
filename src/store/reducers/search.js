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
    let jobsList = sortAndFilter(state.jobsList, action.jobsList);
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

const sortAndFilter = (a, b) => {
    const mergedArray = a.concat(b);
    mergedArray.sort((ele1, ele2) => {
        const ele1Score = Math.trunc(ele1.score * 100);
        const ele2Score = Math.trunc(ele2.score * 100);
        if(ele1Score === ele2Score){
            if(ele1.company >  ele2.company)
                return 1;
            return -1;
        }else if(ele1Score < ele2Score){
            return 1
        }else {
            return -1;
        }
    })
    return filterJobs(mergedArray);
}

const filterJobs = jobList => {
    let i = 0;

    while(i < jobList.length){
        let j = i + 1;
        while(j < jobList.length && Math.trunc(jobList[i].score * 100) === Math.trunc(jobList[j].score * 100) ){
            if(isEquals(jobList[i],jobList[j])){
                 jobList.splice(j,1);
            }else{
                j++;
            }   
        }
        i = i + 1;
    }
    return jobList;
}

const isEquals = (jobDes1 , jobDes2) =>{
    return jobDes1.title.toLowerCase() === jobDes2.title.toLowerCase()
             && jobDes1.company.toLowerCase() === jobDes2.company.toLowerCase()
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