import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// const {
// 	VITE_API_KEY,
// 	VITE_AUTH_DOMAIN,
// 	VITE_PROJECT_ID,
// 	VITE_STORAGE_BUCKET,
// 	VITE_MESSAGING_SENDER_ID,
// 	VITE_APP_ID,
// } = import.meta.env;

const VITE_API_KEY = "AIzaSyD2GivdEALQTOoeAvcP9B58Kr7manSezP8";
const VITE_AUTH_DOMAIN = "agromart-bbf0c.firebaseapp.com";
const VITE_PROJECT_ID = "agromart-bbf0c";
const VITE_STORAGE_BUCKET = "agromart-bbf0c.appspot.com";
const VITE_MESSAGING_SENDER_ID = "835063498215";
const VITE_APP_ID = "1:835063498215:web:e8d952b5899289f828e942";

const firebaseConfig = {
	apiKey: VITE_API_KEY,
	authDomain: VITE_AUTH_DOMAIN,
	projectId: VITE_PROJECT_ID,
	storageBucket: VITE_STORAGE_BUCKET,
	messagingSenderId: VITE_MESSAGING_SENDER_ID,
	appId: VITE_APP_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
