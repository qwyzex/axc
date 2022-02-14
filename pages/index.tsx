import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import ChatRoom from '../components/ChatRoom';
import { SpinnerDotted } from 'spinners-react';

import { auth } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Index: NextPage = () => {
	const [finishLoading, setFinishLoading] = useState(false);
	const [activePage, setActivePage] = useState('loading');

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setActivePage('chatroom');
			setFinishLoading(true);
		} else {
			setActivePage('landing');
			setFinishLoading(true);
		}
	});

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
				className={`mainRoot ${
					activePage === 'landing' ? 'landingPage' : 'chatroomPage'
				} ${finishLoading ? 'finishLoading' : ''}`}
			>
				{activePage === 'landing' ? (
					<Landing />
				) : activePage === 'chatroom' ? (
					<ChatRoom />
				) : (
					''
				)}
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
