// Import general firebase
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2bD8kgHnvlqYpPK9QERgE-hDleHBT9tk",
    authDomain: "one-word-246c8.firebaseapp.com",
    databaseURL: "https://one-word-246c8.firebaseio.com",
    projectId: "one-word-246c8",
    storageBucket: "one-word-246c8.appspot.com",
    messagingSenderId: "461388693078"
};
firebase.initializeApp(config);

export default firebase;
