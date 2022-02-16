// import Link from "next/link";
import { useState } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

import {
	Buttons,
	AppInfo,
	Confirmation,
	AccountInfo,
	SVG,
	FloatingAlert,
	ChatRoom,
	AnchorButton,
} from '..';
import styles from '/styles/Header.module.sass';

import { ChatRoomProps } from './ChatRoom';
import { useModals } from '@mantine/modals';
import { Anchor } from '@mantine/core';

export default function Header({ userData, setActivePage }: ChatRoomProps) {
	const [user] = useAuthState(auth);
	const [authError, setAuthError] = useState('');
	const modals = useModals();

	const [openAppInfo, setOpenAppInfo] = useState(false);
	const [openAccountInfo, setOpenAccountInfo] = useState(false);
	const [confirmLogOut, setConfirmLogOut] = useState(false);

	return (
		<>
			<FloatingAlert message={authError} level={'error'} />
			<header className={styles.header}>
				<div className={styles.appName}>
					<h1>AXC</h1>
				</div>
				<div>
					{openAppInfo && (
						<AppInfo close={() => setOpenAppInfo(!openAppInfo)} />
					)}
					{openAccountInfo && (
						<AccountInfo
							userData={userData}
							close={() => setOpenAccountInfo(!openAccountInfo)}
						/>
					)}
					{confirmLogOut && (
						<Confirmation
							title="Are You Sure You Want To Sign Out?"
							event={() => {
								signOut(auth);
								setConfirmLogOut(!confirmLogOut);
							}}
							setStateRef={
								confirmLogOut ? setConfirmLogOut : () => {}
							}
							stateRef={confirmLogOut ? confirmLogOut : false}
						/>
					)}
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
											setOpenAccountInfo(!openAccountInfo)
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
									Bug
								</a>
							</li>
							<li className={styles.listItem}>
								<Buttons
									className={styles.logOutButton}
									child={
										user ? <SVG.LogOut /> : <SVG.LogIn />
									}
									setConfirmationStateRef={setConfirmLogOut}
									confirmationStateRef={confirmLogOut}
									setErrors={setAuthError}
									setActivePage={setActivePage}
								/>
							</li>
						</ul>
					</div>
				</div>
			</header>
		</>
	);
}
