import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBSi-BY7kVzhKkBxTIVPJRJLzyI0Y4J-i0",
    authDomain: "teacher-s-hack-project.firebaseapp.com",
    projectId: "teacher-s-hack-project",
    storageBucket: "teacher-s-hack-project.appspot.com",
    messagingSenderId: "598750062086",
    appId: "1:598750062086:web:d69f7ba095f39b03898587"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db };