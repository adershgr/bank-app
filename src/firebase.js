import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA3rzVKIzNlZ6GtbGb2JaJznrD5q8ZiCP0',
    authDomain: 'bank-app-1112.firebaseapp.com',
    projectId: 'bank-app-1112',
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
