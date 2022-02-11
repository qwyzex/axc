import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBtISRBT4Q1fw_knzSpX8-AjJZRWIFG3ok',
	authDomain: 'attempt-x.firebaseapp.com',
	projectId: 'attempt-x',
	storageBucket: 'attempt-x.appspot.com',
	messagingSenderId: '242571725661',
	appId: '1:242571725661:web:9e47902df3319b369076b4',
	measurementId: 'G-4R7SF64H5E',
};

export const axcApp: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(axcApp);
export const db: Firestore = getFirestore(axcApp);
