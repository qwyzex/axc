// import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";

import Buttons from "./Buttons";
import AppInfo from "./AppInfo";
import Confirmation from "./Confirmation";
import styles from "../styles/Header.module.sass";
import AccountInfo from "./AccountInfo";

import {
	SVGAccount,
	SVGBug,
	SVGInfo,
	SVGLogIn,
	SVGLogOut,
	SVGMenu,
	SVGTimeReverse,
} from "./Svg";

export default function Header() {
	const [user] = useAuthState(auth);
	const [openAppInfo, setOpenAppInfo] = useState(false);
	const [openAccountInfo, setOpenAccountInfo] = useState(false);
	const [confirmLogOut, setConfirmLogOut] = useState(false);

	const HeaderDropdown = () => {
		return (
			<div>
				{openAppInfo && (
					<AppInfo close={() => setOpenAppInfo(!openAppInfo)} />
				)}
				{openAccountInfo && (
					<AccountInfo
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
						setStateRef={confirmLogOut ? setConfirmLogOut : null}
						stateRef={confirmLogOut ? confirmLogOut : null}
					/>
				)}
				<div className={styles.headerDropdownWrapper}>
					<button
						className={styles.headerDropdownButton}
						name="dropdown-button"
						aria-label="dropdown-button"
					>
						<SVGMenu />
					</button>
					<ul className={styles.listContainer}>
						{user && (
							<li className={styles.listItem}>
								<button
									onClick={() =>
										setOpenAccountInfo(!openAccountInfo)
									}
								>
									<SVGAccount />
									Account
								</button>
							</li>
						)}
						<li className={styles.listItem}>
							<button
								onClick={() => setOpenAppInfo(!openAppInfo)}
							>
								<SVGInfo />
								About
							</button>
						</li>
						<li className={styles.listItem}>
							<Link href="/changelog">
								<a>
									<SVGTimeReverse />
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
								<SVGBug />
								Bug
							</a>
						</li>
						<li className={styles.listItem}>
							<Buttons
								className={styles.logOutButton}
								child={user ? <SVGLogOut /> : <SVGLogIn />}
								setStateRef={setConfirmLogOut}
								stateRef={confirmLogOut}
							/>
						</li>
					</ul>
				</div>
			</div>
		);
	};

	return (
		<header className={styles.header}>
			<div className={styles.appName}>
				<h1>AXC</h1>
			</div>
			<HeaderDropdown />
		</header>
	);
}
