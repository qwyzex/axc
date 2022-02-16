import { useState, useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';
import styles from '/styles/ChangeLog.module.sass';
import { Hr } from '..';

export interface ChangelogDataprops {
	version: string;
	date: string;
	description: string;
	feature: string[];
}

const ChangeLog = () => {
	const [changelogData, setChangelogData]: any = useState([]);

	useEffect(() => {
		async function fetchChangelog() {
			const res: Response = await fetch('/api/changelog');
			const data: JSON = await res.json();

			setChangelogData(data);
		}
		fetchChangelog();
	}, []);

	return (
		<ul className={styles.wrapper}>
			{changelogData ? (
				changelogData
					.map((c: ChangelogDataprops) => (
						<li
							key={c.version}
							id={c.version}
							className={styles.changelogItem}
						>
							<h1>{c.version}</h1>
							<p className={`cascade ${styles.date}`}>{c.date}</p>
							<p className={styles.description}>
								{c.description}
							</p>
							<Hr glow />
							<details className={styles.featureWrapper}>
								<summary>What{"'"}ve Changes?</summary>
								<ul>
									{c.feature.map((f: any) => (
										<li key={f.name}>
											<h5>{f.name}</h5>
											<p>
												{f.description != '' &&
													f.description}
											</p>
										</li>
									))}
								</ul>
							</details>
						</li>
					))
					.reverse()
			) : (
				<SpinnerCircular />
			)}
		</ul>
	);
};

export default ChangeLog;
