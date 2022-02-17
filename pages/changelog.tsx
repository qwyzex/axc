import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';
import styles from '/styles/ChangelogPage.module.sass';

import { SVG, Header, ChangeLog } from '../components';
import { SpinnerDiamond } from 'spinners-react';
import { NextPage } from 'next';
import { getUserData } from '../functions';
import { DocumentData } from 'firebase/firestore';

const ChangeLogPage: NextPage = () => {
	const [user] = useAuthState(auth);

	const [changelogData, setChangelogdata] = useState(null);
	const [userData, setUserData] = useState<DocumentData>({});

	useEffect(() => {
		getUserData(setUserData);
	}, [userData]);

	useEffect(() => {
		async function fetchChangelog() {
			const res: Response = await fetch('/api/changelog');
			const data = await res.json();

			setChangelogdata(data);
		}
		fetchChangelog();
	}, []);

	return (
		<div>
			<Head>
				<title>App Changelog</title>
				<meta name="descripton" content="AXC Life Changelog"></meta>
			</Head>
			<Header userData={userData} setActivePage={() => {}} />
			<main className={styles.container}>
				<Link href="/">
					{user ? '<< Back To Chatroom' : '<< Back To Homepage'}
				</Link>
				<div>
					<SVG.TimeReverse />
					<h1>Changelog</h1>
				</div>
				{changelogData ? <ChangeLog /> : <SpinnerDiamond />}
			</main>
		</div>
	);
};

export default ChangeLogPage;
