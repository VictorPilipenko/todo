import firebase from 'firebase';
import config from './config';
import "firebase/database"

firebase.initializeApp(config);

export const database = firebase.database();
export const authRef = () => firebase.auth();
export const provider = new firebase.auth.EmailAuthProvider();

window.db = database;
window.auth = authRef;
