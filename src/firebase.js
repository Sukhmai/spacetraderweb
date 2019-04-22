import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDTakxyNw9XWDRtZKfqjVFpIcaCR6VK_z0",
    authDomain: "spacetraderweb.firebaseapp.com",
    databaseURL: "https://spacetraderweb.firebaseio.com",
    projectId: "spacetraderweb",
    storageBucket: "spacetraderweb.appspot.com",
    messagingSenderId: "680060128962"
};

firebase.initializeApp(config);
export default firebase;
