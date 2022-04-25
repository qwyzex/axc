import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, CSSProperties } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import useChangelog from '../../hooks/useChangelog.ts';

import { auth } from '../../firebase';

import styles from '../../styles/ChangelogComponent.module.sass';
import { SVG, Loading, Hr } from '..';

import { IndexTypes } from 'pages';
import { ChangelogDataType } from 'pages/api/changelog';
import { useViewportSize } from '@mantine/hooks';

export interface ChangeLogPageProps {
	setActivePage: IndexTypes['setActivePage'];
}

const ChangeLog = () => {
	const [user] = useAuthState(auth);
	const changelogData = useChangelog();

	const window = useViewportSize();

	interface CVS {
		hide: CSSProperties;
		show: CSSProperties;
	}

	const currentVersionStyle: CVS = {
		hide: {
			opacity: '0',
			visibility: 'hidden',
			transition: '.3s ease',
		},
		show: {
			opacity: '1',
			visibility: 'visible',
			transition: '.3s ease',
		},
	};

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
							.map((c: ChangelogDataType, i: number) => (
								<li
									key={c.version}
									id={c.version}
									className={styles.changelogItem}
								>
									{changelogData.length - 1 == i && (
										<>
											<div
												className={
													styles.currentVersionIndicator
												}
												style={
													window.width <= 400
														? currentVersionStyle.show
														: currentVersionStyle.hide
												}
											>
												<SVG.Check />
											</div>
											<div
												className={
													styles.currentVersionIndicator
												}
												style={
													window.width > 400
														? currentVersionStyle.show
														: currentVersionStyle.hide
												}
											>
												{'CURRENT VERSION'}
											</div>
										</>
									)}
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
