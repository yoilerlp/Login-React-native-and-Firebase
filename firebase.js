import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCRy5LP5mNkFSzXHUM5WhPMOX5Wpp9ll8I",
  authDomain: "loginreactnative-28315.firebaseapp.com",
  databaseURL: "https://loginreactnative-28315.firebaseio.com",
  projectId: "loginreactnative-28315",
  storageBucket: "loginreactnative-28315.appspot.com",
  messagingSenderId: "177343092839",
  appId: "1:177343092839:web:99e2a87cba74e849915cc2",
  measurementId: "G-X27VSH7W2C"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
export default firebase;
