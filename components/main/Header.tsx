// import Link from "next/link";
import { useState } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

import { SVG, FloatingAlert } from '..';
import styles from '/styles/Header.module.sass';

import { ChatRoomProps } from './ChatRoom';
import { useModals } from '@mantine/modals';
import ButtonSignOut from '../small/ButtonSignOut';
import ButtonSignIn from '../small/ButtonSignIn';
import AccountInfo from '../mantine/AccountInfo';

export default function Header({ userData, setActivePage }: ChatRoomProps) {
	const [user] = useAuthState(auth);
	const [authError, setAuthError] = useState('');
	const modals = useModals();

	return (
		<>
			<FloatingAlert message={authError} level={'error'} />
			<header className={styles.header}>
				<div className={styles.appName}>
					<h1>AXC</h1>
				</div>
				<div>
					<div className={styles.headerDropdownWrapper}>
						<button
							className={styles.headerDropdownButton}
							name="dropdown-button"
							aria-label="dropdown-button"
						>
							<SVG.Menu />
						</button>
						<ul className={styles.listContainer}>
							{user && (
								<li className={styles.listItem}>
									<button
										onClick={() =>
											modals.openModal({
												title: 'Account Information',
												centered: true,
												closeOnEscape: true,
												children: (
													<AccountInfo
														userData={userData}
														setActivePage={
															setActivePage
														}
													/>
												),
											})
										}
									>
										<SVG.Account />
										Account
									</button>
								</li>
							)}
							<li className={styles.listItem}>
								<button
									onClick={() => {
										modals.openContextModal('appInfo', {
											title: 'App Info',
											centered: true,
											transition: 'pop',
											closeOnEscape: true,
											overlayOpacity: 0.6,
										});
									}}
								>
									<SVG.Info />
									About
								</button>
							</li>
							<li className={styles.listItem}>
								<Link href="/changelog">
									<a>
										<SVG.TimeReverse />
										Changelog
									</a>
								</Link>
							</li>
							<li className={styles.listItem}>
								<a
									href="https://github.com/qwyzex/axc/issues/new"
									target="_blank"
									rel="noreferrer"
								>
									<SVG.Bug />
									Bug Report
								</a>
							</li>
							<li className={styles.listItem}>
								{user ? (
									<ButtonSignOut
										setActivePage={setActivePage}
									/>
								) : (
									<ButtonSignIn
										setActivePage={setActivePage}
									/>
								)}
							</li>
						</ul>
					</div>
				</div>
			</header>
		</>
	);
}
