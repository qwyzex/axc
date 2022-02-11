import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import ChatRoom from '../components/ChatRoom';
import { SpinnerDotted } from 'spinners-react';

import { auth } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

const Index: NextPage = () => {
	const [user] = useAuthState(auth);
	const [firebaseData, setFirebaseData] = useState(false);
	const [loadingOut, setLoadingOut] = useState(false);

	setTimeout(() => {
		setFirebaseData(true);
	}, 600);

	if (firebaseData) {
		setTimeout(() => {
			setLoadingOut(true);
		}, 1200);
	}

	return (
		<>
			<Head>
				<title>AXC</title>
				<meta name="description" content="Attemp-X Chat App" />
				<meta name="theme-color" content="light" />
				<link rel="apple-touch-icon" href="/favicon.ico"></link>
			</Head>
			<Header />
			<main
				className={`mainRoot ${firebaseData && 'fetchedRoot'} ${
					!user && 'displayLanding'
				}`}
			>
				{firebaseData ? user ? <ChatRoom /> : <Landing /> : null}
				{!loadingOut && (
					<SpinnerDotted
						color="#ff003c"
						thickness={150}
						size={75}
						speed={140}
						className={`loadingSpinner ${
							firebaseData && 'leaveAnimation'
						}`}
					/>
				)}
			</main>
		</>
	);
};

export default Index;
