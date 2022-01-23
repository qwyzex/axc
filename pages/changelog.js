import Header from "components/Header";
import { SVGTimeReverse } from "components/Svg";
import Head from "next/head";
import Link from "next/link";
import { auth } from "pages";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerDiamond } from "spinners-react";
import ChangeLog from "../components/Changelog";
import { changelog } from "../data/changelogs";
import styles from "../styles/ChangelogPage.module.sass";

const ChangeLogPage = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            <Head>
                <title>App Changelog</title>
                <meta name="descripton" content="AXC Life Changelog"></meta>
            </Head>
            <Header />
            <main className={styles.container}>
                <Link href="/">
                    {user ? "<< Back to Chatroom" : "<< Back to Homepage"}
                </Link>
                <div>
                    <SVGTimeReverse />
                    <h1>Changelog</h1>
                </div>
                {!changelog.length ? <SpinnerDiamond /> : <ChangeLog />}
            </main>
        </div>
    );
};

export default ChangeLogPage;
