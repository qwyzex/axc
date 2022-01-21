import Head from "next/head";
import Link from "next/link";

export default function Page404() {
    return (
        <div>
            <Head>
                <title>No Other Pages | 404</title>
                <description>/qwyzex</description>
            </Head>
            <h1>404 Error!</h1>
            <p>This app has no other pages! Or is it?</p>
            <Link href="/">
                <a>Get Back</a>
            </Link>
        </div>
    );
}
