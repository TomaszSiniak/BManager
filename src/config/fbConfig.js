import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBDuVMx_dg0fLHgqhJvyrer82jiSbK3_uE",
    authDomain: "bmanager-test.firebaseapp.com",
    databaseURL: "https://bmanager-test.firebaseio.com",
    projectId: "bmanager-test",
    storageBucket: "bmanager-test.appspot.com",
    messagingSenderId: "332753742666",
    appId: "1:332753742666:web:759aa3eae3193fd3"
  };
  // Initialize Firebase


  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase;