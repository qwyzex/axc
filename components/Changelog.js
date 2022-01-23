import { changelog } from "../data/changelogs";
import styles from "../styles/ChangeLog.module.sass";

const ChangeLog = () => {
    // changelog.length = 10;

    return (
        <ul className={styles.wrapper}>
            {changelog
                .map((c) => (
                    <li key={c.version} id={c.version} className={styles.changelogItem}>
                        <h1>{c.version}</h1>
                        <p className={`cascade ${styles.date}`}>{c.date}</p>
                        <p className={styles.description}>{c.description}</p>
                        <details className={styles.featureWrapper}>
                            <summary>What's New?</summary>
                            <ul>
                                {c.feature.map((f) => (
                                    <li key={f.name}>
                                        <h5>{f.name}</h5>
                                        <p>{f.description != "" && f.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))
                .reverse()}
            {changelog.forEach((c) => (
                <li key={c.version} id={c.version} className={styles.changelogItem}>
                    <h1>{c.version}</h1>
                    <p className={`cascade ${styles.date}`}>{c.date}</p>
                    <p className={styles.description}>{c.description}</p>
                    <details className={styles.featureWrapper}>
                        <summary>What's New?</summary>
                        <ul>
                            {c.feature.map((f) => (
                                <li key={f.name}>
                                    <h5>{f.name}</h5>
                                    <p>{f.description != "" && f.description}</p>
                                </li>
                            ))}
                        </ul>
                    </details>
                </li>
            ))}
        </ul>
    );
};

export default ChangeLog;
