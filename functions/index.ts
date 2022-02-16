// imports
import { onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { auth, db } from '../firebase';

// type interfaces
export interface CustomErrorThis {
	message: string;
	code: string;
}

// functions
export const CustomError = function (
	this: CustomErrorThis,
	code: string,
	message: string
) {
	this.code = code;
	this.message = message;
};
CustomError.prototype = new Error();

/**
 * Returns the user's data from the database.
 * @param {setUserDataVariables} setUserDataVariables The function to set the user's data.
 */
export const getUserData = (
	setUserDataVariables: Dispatch<SetStateAction<DocumentData>>
) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const usersRef: CollectionReference = collection(db, 'users');
			const docRef: DocumentReference = doc(usersRef, user!.uid);
			const docSnap: DocumentSnapshot = await getDoc(docRef);

			// @ts-ignore
			setUserDataVariables(docSnap.data());
		}
	});
};
