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

export function firerrMantine(code: string) {
	switch (code) {
		case 'auth/user-not-found':
			return 'User not found';
		case 'auth/missing-email':
			return 'Please insert an email address';
		case 'auth/weak-password':
			return 'Password Must Be At Least 6 Characters';
		case 'auth/email-already-in-use':
			return 'Email Is Already In Use, Please Try Different Email';
		case 'auth/invalid-email':
			return 'Please Insert A Valid Email Address';
		case 'auth/account-exists-with-different-credential':
			return 'Account is already exist with different credentials';
		case 'auth/credential-already-in-use':
			return 'Credentials Is Already In use';
		case 'auth/operation-not-supported-in-this-environment':
			return 'The Operation is not allowed/supported in this environment';
		case 'auth/timeout':
			return 'Request timeout, try again later';
		case 'auth/argument-error':
		case 'auth/invalid-persistence-type':
		case 'auth/unsupported-persistence-type':
			return 'an unknown error occured';
		case 'auth/invalid-credential':
			return 'Invalid credentials';
		case 'auth/wrong-password':
			return 'Wrong password';
		case 'auth/invalid-verification-code':
			return 'Invalid verification code';
		case 'auth/invalid-verification-id':
			return 'Invalid verification ID';
		case 'auth/custom-token-mismatch':
			return 'Custom token is mismatched';
		case 'auth/invalid-custom-token':
			return 'Invalid custom token';
		case 'auth/captcha-check-failed':
			return 'Captcha failed';
		case 'auth/invalid-phone-number':
			return 'Invalid phone number';
		case 'auth/missing-phone-number':
			return 'Please enter a phone number';
		case 'auth/quota-exceeded':
			return 'Authentication qota exceeded';
		case 'auth/cancelled-popup-request':
			return 'Cancelled popup authentication';
		case 'auth/popup-blocked':
			return 'Popup is blocked';
		case 'auth/popup-closed-by-user':
			return 'Popup window is closed by the user';
		case 'auth/invalid-user-token':
			return 'Invalid user token';
		case 'auth/user-token-expired':
			return 'User token is expired';
		case 'auth/null-user':
			return 'User is null';
		case 'auth/invalid-api-key':
			return 'Invalid api key';
		case 'auth/network-request-failed':
			return "Can't connect to the server";
		case 'auth/requires-recent-login':
			return 'Auth require recent login';
		case 'auth/too-many-requests':
			return 'Account is temporarily disabled due to too many request';
		case 'auth/id-token-expired':
			return 'ID token is expired';
		case 'auth/invalid-creation-time':
			return 'Invalid creation time, try again later';
		case 'auth/invalid-display-name':
			return 'Invalid username';
		case 'auth/invalid-email-verified':
			return 'Email is not yet verified';
		case 'auth/invalid-id-token':
			return 'ID token invalid';
		case 'auth/invalid-password':
			return 'Invalid password';
		case 'auth/invalid-password-hash':
			return 'Invalid password hash';
		case 'auth/invalid-photo-url':
			return "Invalid user's profile picture";
		case 'auth/invalid-provider-id':
			return 'Invalid provider id';
		case 'auth/invalid-session-cookie-duration':
			return 'Session cookie duration is invalid';
		case 'auth/invalid-uid':
			return 'Invalid user id';
		case 'auth/maximum-user-count-exceeded':
			return 'Maximum user count is exceeded';
		case 'auth/missing-uid':
			return 'Missing user AD';
		case 'auth/session-cookie-revoked':
			return 'Session cookie is revoked';
		case 'auth/uid-alread-exists':
			return 'User id is already exist';
		case 'auth/email-already-exists':
			return 'Email is already exist, please try another email address';
		case 'auth/phone-number-already-exists':
			return 'Phone number is already exist, please use another phone number';
		case 'auth/project-not-found':
			return 'Firebase project not found';
		case 'auth/insufficient-permission':
			return 'Insufficient permisson, you are not allowed to do this operation';
		case 'auth/internal-error':
			return 'An error occured on the client';
		default:
			return 'An unknown error is occured';
	}
}
