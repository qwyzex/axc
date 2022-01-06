import styles from "../styles/Header.module.sass";

export default function Header({ children }) {
    return (
        <div className={styles.header}>
            <div>
                <h1>AXC</h1>
            </div>
            <div>{children}</div>
        </div>
    );
}
