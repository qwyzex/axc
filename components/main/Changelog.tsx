import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase';

import styles from '../../styles/Changelog.module.sass';
import { SVG, Header, Loading, Hr } from '..';

import { NextPage } from 'next';
import { getUserData } from '../../functions';
import { DocumentData } from 'firebase/firestore';
import { IndexTypes } from 'pages';
import { ChangelogDataType } from 'pages/api/changelog';

export interface ChangeLogPageProps {
	setActivePage: IndexTypes['setActivePage'];
}

const ChangeLog = () => {
	const [user] = useAuthState(auth);

	const [changelogData, setChangelogData] = useState<ChangelogDataType[]>();

	useEffect(() => {
		async function fetchChangelog() {
			const res: Response = await fetch('/api/changelog');
			const data = await res.json();

			setChangelogData(data);
		}
		fetchChangelog();
	}, []);

	return (
		<div>
			<Head>
				<title>AXC Changelog</title>
				<meta name="descripton" content="AXC Life Changelog"></meta>
			</Head>
			<main className={styles.container}>
				<Link href="/">
					<a>
						{user ? '<< Back To Chatroom' : '<< Back To Homepage'}
					</a>
				</Link>
				<div>
					<SVG.TimeReverse />
					<h1>Changelog</h1>
				</div>
				{changelogData && (
					<ul className={styles.wrapper}>
						{changelogData
							.map((c: ChangelogDataType) => (
								<li
									key={c.version}
									id={c.version}
									className={styles.changelogItem}
								>
									<h1>{c.version}</h1>
									<p className={`cascade ${styles.date}`}>
										{c.date}
									</p>
									<p className={styles.description}>
										{c.description}
									</p>
									{c.feature && (
										<>
											<Hr glow />
											<details
												className={
													styles.featureWrapper
												}
											>
												<summary>
													What{"'"}ve Changes?
												</summary>
												<ul>
													{c.feature.map((f: any) => (
														<li key={f.name}>
															<h5>{f.name}</h5>
															<p>
																{f.description !=
																	'' &&
																	f.description}
															</p>
														</li>
													))}
												</ul>
											</details>
										</>
									)}
								</li>
							))
							.reverse()}
					</ul>
				)}
				<Loading className={changelogData ? styles.out : ''} />
			</main>
		</div>
	);
};

export default ChangeLog;
