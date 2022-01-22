import Head from "next/head";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import Landing from "../components/Landing";
import ChatRoom from "components/ChatRoom";
import { SpinnerDotted } from "spinners-react";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBtISRBT4Q1fw_knzSpX8-AjJZRWIFG3ok",
    authDomain: "attempt-x.firebaseapp.com",
    projectId: "attempt-x",
    storageBucket: "attempt-x.appspot.com",
    messagingSenderId: "242571725661",
    appId: "1:242571725661:web:9e47902df3319b369076b4",
    measurementId: "G-4R7SF64H5E",
};

export const axcApp = initializeApp(firebaseConfig);
export const auth = getAuth(axcApp);
export const db = getFirestore(axcApp);

export default function Index() {
    const [user] = useAuthState(auth);
    const [firebaseData, setFirebaseData] = useState(false);

    useEffect(() => {
        if (auth != null) {
            setTimeout(() => {
                setFirebaseData(true);
            }, 500);
        }
    }, []);

    return (
        <>
            <Head>
                <title>AXC</title>
                <meta name="description" content="Attemp-X Chat App" />
            </Head>
            <Header />
            <main
                className={`mainRoot ${firebaseData && "fetchedRoot"} ${
                    !user && "displayLanding"
                }`}
            >
                {firebaseData ? user ? <ChatRoom /> : <Landing /> : null}
                <SpinnerDotted
                    color="#ff003c"
                    thickness={150}
                    size={75}
                    speed={140}
                    className="loadingSpinner"
                />
            </main>
        </>
    );
}

export const Home = () => {
    return (
        <div>
            <h1>AXC</h1>
            <Buttons />
        </div>
    );
};

// export let openAppInfo = false;
