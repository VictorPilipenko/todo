import * as firebase from "firebase";

const config = {
  apiKey: 'AIzaSyAe5v-NEAWhCZHBOwVvjV8DiK06lc6EeJA',
  authDomain: 'phonebook-2471d.firebaseapp.com',
  databaseURL: 'https://phonebook-2471d.firebaseio.com',
  projectId: 'phonebook-2471d',
  storageBucket: 'phonebook-2471d.appspot.com',
  messagingSenderId: 77144267154
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export { db, auth, firestore };
