import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import styles from "../styles/ChangelogPage.module.sass";

import Header from "../components/Header";
import ChangeLog from "../components/Changelog";
import { SVGTimeReverse } from "../components/Svg";
import { SpinnerDiamond } from "spinners-react";

const ChangeLogPage = () => {
	const [user] = useAuthState(auth);

	const [changelogData, setChangelogdata] = useState(null);

	useEffect(() => {
		async function fetchChangelog() {
			const res = await fetch("/api/changelog");
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
			<Header />
			<main className={styles.container}>
				<Link href="/">
					{user ? "<< Back To Chatroom" : "<< Back To Homepage"}
				</Link>
				<div>
					<SVGTimeReverse />
					<h1>Changelog</h1>
				</div>
				{changelogData ? <ChangeLog /> : <SpinnerDiamond />}
			</main>
		</div>
	);
};

export default ChangeLogPage;
