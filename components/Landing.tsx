import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '../styles/Landing.module.sass';
import AnchorButton from './AnchorButton';
import Buttons from './Buttons';
import { SVGTimeReverse } from './Svg';
import { ChangelogDataprops } from './Changelog';
import Loading from './Loading';
import FloatingAlert from './FloatingAlert';

export interface LandingProps {
	setActivePage: Dispatch<SetStateAction<string>>;
}

const Landing = ({ setActivePage }: LandingProps) => {
	const [changelogData, setChangelogdata] = useState([]);
	const [landingError, setLandingError] = useState('');

	useEffect(() => {
		async function fetchChangelog() {
			const res: Response = await fetch('/api/changelog');
			const data = await res.json();

			setTimeout(() => {
				setChangelogdata(data);
			}, 1000);
		}
		fetchChangelog();
	}, []);

	return (
		<>
			<FloatingAlert message={landingError} level={'warn'} />
			<div className={`landing ${styles.container}`}>
				<main>
					<header className={styles.header}>
						<h1 className={styles.title}>AXC</h1>
						<p className={styles.description}>Attemp-X CHAT App</p>
					</header>
					<hr />
					<div className={styles.body}>
						<article className={styles.texts}>
							<p>
								This is my second realtime-chat-app. Built with
								NextJS, made in 4 days (Initially). I made this
								as an improvements from my previous chat app,{' '}
								<a
									href="https://github.com/qwyzex/azcha"
									target="_blank"
									rel="noreferrer"
								>
									AzCHA
								</a>
								. That one is such a mess. It{"'"}s made with{' '}
								<code>create-react-app</code> and using Firebase
								SDK7 / SDK8 syntax, the performance is worse
								than AXC altough not really visible to end-user.
							</p>
							<p>
								Now AXC is much better in every way than AzCHA.
								More features and insight. Better front-end. To
								be fair this is not all the features that inside
								my head, there{"'"}s so much more I want
								implement to AXC. It{"'"}s only a matter of
								time, or my will.
							</p>
						</article>
						<div className={styles.buttonsWrapper}>
							<button onClick={() => setActivePage('signin')}>
								SIGN IN NOW
							</button>
							{/* <Buttons
								signInText="SIGN IN NOW"
								setErrors={setLandingError}
								setConfirmationStateRef={() => {}}
								confirmationStateRef={false}
								bold
								col
							/> */}
							<AnchorButton
								to="https://github.com/qwyzex/axc"
								newtab
								text="Source Code"
								color="260"
								dark
								invertClick
								bold
								thickness={4}
								shadowHover
							/>
							<AnchorButton
								to="https://twitter.com/qwyzex"
								newtab
								text="Follow me on Twitter"
								color="200"
								dark
								invertClick
								bold
								thickness={4}
								shadowHover
							/>
						</div>
					</div>
				</main>
				<aside className={styles.changeLogContainer}>
					<div>
						<SVGTimeReverse />
						<h2>CHANGELOG</h2>
					</div>
					<ul>
						{changelogData.length ? (
							changelogData
								.slice(0, 3)
								.map((c: ChangelogDataprops) => (
									<li key={c.version}>
										<Link href={`/changelog#${c.version}`}>
											<a></a>
										</Link>
										<h3 key={c.version}>{c.version}</h3>
										<p
											key={c.date}
											className={styles.changeLogDate}
										>
											{c.date}
										</p>
										<p
											key={c.description}
											className={styles.changeLogDesc}
										>
											{c.description}
										</p>
									</li>
								))
						) : (
							<Loading color="#ffffff" />
							// <h1>Loading...</h1>
						)}
					</ul>
					<Link href={'/changelog'}>
						<a>
							More
							<span></span>
						</a>
					</Link>
				</aside>
			</div>
		</>
	);
};

export default Landing;
