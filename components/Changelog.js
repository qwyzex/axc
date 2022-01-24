import { changelog } from "../data/changelogs";
import styles from "../styles/ChangeLog.module.sass";
import Hr from "./Hr";

const ChangeLog = () => {
    return (
        <ul className={styles.wrapper}>
            {changelog
                .map((c) => (
                    <li key={c.version} id={c.version} className={styles.changelogItem}>
                        <h1>{c.version}</h1>
                        <p className={`cascade ${styles.date}`}>{c.date}</p>
                        <p className={styles.description}>{c.description}</p>
                        <Hr glow />
                        <details className={styles.featureWrapper}>
                            <summary>What've Changes?</summary>
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
        </ul>
    );
};

export default ChangeLog;
