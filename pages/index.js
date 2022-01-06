import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBtISRBT4Q1fw_knzSpX8-AjJZRWIFG3ok",
    authDomain: "attempt-x.firebaseapp.com",
    projectId: "attempt-x",
    storageBucket: "attempt-x.appspot.com",
    messagingSenderId: "242571725661",
    appId: "1:242571725661:web:9e47902df3319b369076b4",
    measurementId: "G-4R7SF64H5E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export default function Home() {
    const user = false;

    return (
        <div>
            <Head>
                <title>AXC</title>
                <meta name="description" content="Attemp-X Chat App" />
            </Head>

            <Header>
                <div>
                    <button></button>
                    <ul>
                        <li>
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://somewhere.idk">
                                <a>Donate</a>
                            </Link>
                        </li>
                        <li>{user ? <button>btn</button> : <span>no</span>}</li>
                    </ul>
                </div>
            </Header>
            <h1>Index Page</h1>
        </div>
    );
}
