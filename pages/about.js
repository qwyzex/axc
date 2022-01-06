import Head from "next/head";

export default function About() {
    return (
        <div>
            <Head>
                <title>About AXC</title>
                <meta name="description" content="Attemp-X About Page" />
            </Head>
            <header>
                <h1>AXC</h1>
                <p>Attemp-X Chat App</p>
            </header>
            <article>
                This is my second chat web application. Build with{" "}
                <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                    NextJS
                </a>{" "}
                and deployed to{" "}
                <a href="https://vercel.com" target="_blank" rel="noreferrer">
                    Vercel
                </a>
            </article>
        </div>
    );
}
