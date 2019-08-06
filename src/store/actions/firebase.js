import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCKq-oucjJaXzP0EQgQ2k9gFnlwdQXJEeY",
    authDomain: "jobhunteengine.firebaseapp.com",
    databaseURL: "https://jobhunteengine.firebaseio.com",
    projectId: "jobhunteengine",
    storageBucket: "jobhunteengine.appspot.com",
    messagingSenderId: "53366055539",
    appId: "1:53366055539:web:22a63150ba20b679"
  };
  
export const app = firebase.initializeApp(config);
export const signInWithEmail = (email, password) =>  firebase.auth().signInWithEmailAndPassword(email, password);
export const signupWithEmail = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const resetPassword = email => firebase.auth().sendPasswordResetEmail(email);
 