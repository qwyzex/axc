import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import ChatRoom from '../components/ChatRoom';
import { SpinnerDotted } from 'spinners-react';

import { auth, db } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthForm from '../components/AuthForm';
import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	setDoc,
} from 'firebase/firestore';
import FloatingAlert from '../components/FloatingAlert';

const Index: NextPage = () => {
	const [user] = useAuthState(auth);
	const [finishLoading, setFinishLoading] = useState(false);
	const [activePage, setActivePage] = useState('loading');
	const [globalAppError, setGlobalAppError] = useState('');

	const [userData, setUserData] = useState<DocumentData>({});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const getUserData = async () => {
					const usersRef: CollectionReference = collection(
						db,
						'users'
					);
					const docRef: DocumentReference = doc(usersRef, user.uid);
					const docSnap: DocumentSnapshot = await getDoc(docRef);

					if (docSnap.exists()) {
						setUserData(docSnap.data());
						if (userData.uid !== user.uid) {
							signOut(auth);
							setGlobalAppError(
								'User data does not match user. User already exist with different credentials/provider!'
							);
						}
						setFinishLoading(true);
						setActivePage('chatroom');
					} else {
						// prettier-ignore
						await setDoc(doc(usersRef, user.uid), {
							uid: user.uid,
							email: user.email,
							displayName: user.displayName === null ? `user-${Math.random() * 20000000000000000 - 1000000}` : user.displayName,
							photoURL: user.photoURL
								? user.photoURL
								: '/favicon.ico',
						}).then(() => {
							getUserData();
						});
					}
				};
				getUserData();
			} else {
				setActivePage('landing');
				setFinishLoading(true);
			}
		});
	}, [user, userData]);

	return (
		<>
			<Head>
				<title>AXC</title>
				<meta name="description" content="Attemp-X Chat App" />
				<meta name="theme-color" content="light" />
				<link rel="apple-touch-icon" href="/favicon.ico"></link>
			</Head>
			<FloatingAlert message={globalAppError} level="error" />
			<Header userData={userData} />
			<main
				className={`mainRoot ${
					activePage === 'landing' ? 'landingPage' : 'chatroomPage'
				} ${finishLoading ? 'finishLoading' : ''}`}
			>
				{activePage === 'landing' ? (
					<Landing setActivePage={setActivePage} />
				) : activePage === 'chatroom' ? (
					<ChatRoom userData={userData} />
				) : activePage === 'signin' ? (
					<AuthForm />
				) : null}
				<SpinnerDotted
					color="#ff003c"
					thickness={150}
					size={75}
					speed={140}
					className={`loadingSpinner`}
				/>
			</main>
		</>
	);
};

export default Index;
