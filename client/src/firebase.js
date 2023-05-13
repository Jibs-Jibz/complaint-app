import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB5D65C7r5Y6qFxPMykTZHjO8bmGDeHevg",
  authDomain: "complaint-app-8e9b9.firebaseapp.com",
  projectId: "complaint-app-8e9b9",
  storageBucket: "complaint-app-8e9b9.appspot.com",
  messagingSenderId: "280979330002",
  appId: "1:280979330002:web:55010fc96c113f72762e0b",
  measurementId: "G-9JV8GTYWT2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Cloud Function to create a user document in Firestore upon signup
// exports.createUserDoc = functions.auth.user().onCreate((user) => {
//   return db.collection("users").doc(user.uid).set({
//     firstName: user.displayName.split(" ")[0],
//     lastName: user.displayName.split(" ")[1],
//     email: user.email
//   });
// });

export { auth };
export default db;
