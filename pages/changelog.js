import Header from "components/Header";
import Head from "next/head";
import Link from "next/link";
import { auth } from "pages";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerDiamond } from "spinners-react";
import ChangeLog from "../components/Changelog";
import { changelog } from "../data/changelogs";

const ChangeLogPage = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            <Head>
                <title>App Changelog</title>
                <meta name="descripton" content="AXC Life Changelog"></meta>
            </Head>
            <Header />
            <Link href="/">{user ? " Back to Chatroom" : " Back to Homepage"}</Link>
            <h1>Changelog</h1>
            {!changelog.length ? <SpinnerDiamond /> : <ChangeLog />}
        </div>
    );
};

export default ChangeLogPage;
