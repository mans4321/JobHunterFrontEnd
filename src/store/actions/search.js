import * as actionTypes from './actionTypes';
import * as firebase from './firebase';
import axios from 'axios';


export const fetchJobsSuccess = ( jobsList ) => {
    return {
        type: actionTypes.FETCH_JOBS_SUCCESS,
        jobsList: jobsList
    };
};

export const fetchJobsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_JOBS_FAIL,
        error: error
    };
};

export const fetchJobsStart = () => {
    return {
        type: actionTypes.FETCH_JOBS_START
    };
};

export const fetchUserDataSuccess = (userInfo) => {
     return {
         type: actionTypes.FETCH_USER_DATA_SUCCESS,
         userInfo: userInfo
     };
 };
 
 export const fetchUserData = userID => {
    return dispatch => {
        firebase.database.ref('/users/' + userID).once('value')
        .then(snapshot=> {
                console.log(snapshot.val())
                dispatch(fetchUserDataSuccess(snapshot.val()));
          }).catch(err=> console.log(err));
    }
}

const websites = [
    'https://indeedjobsfetcher.herokuapp.com/fetch?',
    'https://workopolisjobsfetcher.herokuapp.com/fetch?',
    'https://simplyhiredjobsfetcher.herokuapp.com/fetch?' 
];

export const fetchJobs = (userInfo, userID) => {
    const queryParameters = getQueryParameters(userInfo);
    return dispatch => {
        if(userID){
            writeUserData(userInfo, userID)
        }
        dispatch(fetchJobsStart());
        websites.forEach( website => {
            axios.get(website + queryParameters).then(res =>{
               dispatch(fetchJobsSuccess(res.data.jobs));
            }).catch(err => {}); 
        }); 
    };
};

const mapString = (str, init) =>{
    return str.split(',').reduce( function (a, b) {
        b = b.trim();
        return b === '' ? a : a + b + ','; 
     }, init + '= ').slice(0, -1);
}
const getQueryParameters = userInfo => {
    const cities = mapString(userInfo.cities,'cities');
    const titles = mapString(userInfo.titles,'titles');
    const skills = mapString(userInfo.skills,'skills');
    return `${cities}&${titles}&${skills}`;
}

const writeUserData = (userInfo, userId) => {
    firebase.database.ref('users/' + userId).set({
        ...userInfo
    });
  }