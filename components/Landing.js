import { useState } from "react";
import styles from "../styles/Landing.module.sass";
import AnchorButton from "./AnchorButton";
import Buttons from "./Buttons";
import { changelog } from "../data/changelogs";
import Link from "next/link";
import { SVGTimeReverse } from "./Svg";

const Landing = () => {
    const [animating, setAnimating] = useState(true);

    setTimeout(() => {
        setAnimating(false);
    }, 1000);

    return (
        <>
            <div
                className={`landing ${styles.container} ${animating && styles.animating}`}
            >
                <main>
                    <header className={styles.header}>
                        <h1 className={styles.title}>AXC</h1>
                        <p className={styles.description}>Attemp-X CHAT App</p>
                    </header>
                    <hr />
                    <div className={styles.body}>
                        <article className={styles.texts}>
                            <p>
                                This is my second realtime-chat-app. Built with NextJS,
                                made in 4 days (Initially). I made this as an improvements
                                from my previous chat app,{" "}
                                <a
                                    href="https://github.com/qwyzex/azcha"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    AzCHA
                                </a>
                                . That one is such a mess. It's made with{" "}
                                <code>create-react-app</code> and using Firebase SDK7 /
                                SDK8 syntax, the performance is worse than AXC altough not
                                really visible to end-user.
                            </p>
                            <p>
                                Now AXC is much better in every way than AzCHA. More
                                features and insight. Better front-end. To be fair this is
                                not all the features that inside my head, there's so much
                                more I want implement to AXC. It's only a matter of time,
                                or my will.
                            </p>
                        </article>
                        <div className={styles.buttonsWrapper}>
                            <Buttons
                                signInText="SIGN IN NOW"
                                // identifier="with Google"
                                bold
                                col
                            />
                            <AnchorButton
                                to="https://github.com/qwyzex/axc"
                                newtab
                                text="Source Code"
                                color="260"
                                light
                                bold
                                thickness={3}
                            />
                            <AnchorButton
                                to="https://twitter.com/qwyzex"
                                newtab
                                text="Follow me on Twitter"
                                color="200"
                                light
                                bold
                                thickness={3}
                            />
                        </div>
                    </div>
                </main>
                <aside className={styles.changeLogContainer}>
                    <div>
                        <SVGTimeReverse />
                        <h2>CHANGELOG</h2>
                    </div>
                    <ul>
                        {changelog.map((c) => (
                            <li key={c.version}>
                                <Link href={`/changelog#${c.version}`}>
                                    <a>
                                        <span></span>
                                    </a>
                                </Link>
                                <h3 key={c.version}>{c.version}</h3>
                                <p key={c.date} className={styles.changeLogDate}>
                                    {c.date}
                                </p>
                                <p key={c.description} className={styles.changeLogDesc}>
                                    {c.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <Link href={"/changelog"}>
                        <a>
                            More
                            <span></span>
                        </a>
                    </Link>
                </aside>
            </div>
        </>
    );
};

export default Landing;
