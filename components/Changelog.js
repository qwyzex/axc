import { changelog } from "../data/changelogs";

const ChangeLog = () => {
    return (
        <ul>
            {changelog.map((c) => (
                <li key={c.version} id={c.version}>
                    <h1>{c.version}</h1>
                    <p>{c.date}</p>
                    <p>{c.description}</p>
                    <details>
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
