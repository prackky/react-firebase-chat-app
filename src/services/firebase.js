import firebase from 'firebase';

const config = {
    apiKey: "API_KEY",
    authDomain: "localhost",
    databaseURL: "https://my-new-project-182216.firebaseio.com/"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();
