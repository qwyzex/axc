import { ChangeLog, Header } from '../components';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getUserData } from '../functions';
import { DocumentData } from 'firebase/firestore';

const ChangelogPage: NextPage = () => {
	const [userData, setUserData] = useState<DocumentData>({});

	useEffect(() => {
		getUserData(setUserData);
	}, [userData]);

	return (
		<>
			<Header userData={userData} setActivePage={() => {}} />
			<ChangeLog />
		</>
	);
};

export default ChangelogPage;
