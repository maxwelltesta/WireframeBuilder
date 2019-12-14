import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
var firebaseConfig = {
    apiKey: "AIzaSyAty2WzWC1EhGvoaPZutZLK4LPEsZ6xmT8",
    authDomain: "wireframer-matesta.firebaseapp.com",
    databaseURL: "https://wireframer-matesta.firebaseio.com",
    projectId: "wireframer-matesta",
    storageBucket: "wireframer-matesta.appspot.com",
    messagingSenderId: "771224208029",
    appId: "1:771224208029:web:bd650d18a4844bbc7a8a74",
    measurementId: "G-0ZJ3Q6G828"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;