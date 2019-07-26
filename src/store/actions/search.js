import * as actionTypes from './actionTypes';
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



export const fetchJobs = (userInfo) => {
    const queryParameters = getQueryParameters(userInfo);
    const workopolis = 'https://workopolisjobsfetcher.herokuapp.com/fetch?' + queryParameters;
    const indeed = 'https://indeedjobsfetcher.herokuapp.com/fetch?' + queryParameters;
    const simplyHired = 'https://simplyhiredjobsfetcher.herokuapp.com/fetch?' + queryParameters;

    return dispatch => {
        console.log(indeed);
        axios.get(indeed).then(res =>{
            console.log(res);
        }).catch(err => {
            console.log(err);
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
