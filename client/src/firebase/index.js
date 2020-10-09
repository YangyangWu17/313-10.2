import firebase from "firebase/app";
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAdWjTqxLaPO0-0qzB_HEPIgQawRUKdsr4",
    authDomain: "sit313-289808.firebaseapp.com",
    databaseURL: "https://sit313-289808.firebaseio.com",
    projectId: "sit313-289808",
    storageBucket: "sit313-289808.appspot.com",
    messagingSenderId: "711124977194",
    appId: "1:711124977194:web:f5f716473189ede23f6553"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {
    storage, firebase as default
}