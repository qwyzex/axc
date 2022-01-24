import styles from "../styles/Hr.module.sass";

export default function Hr(props) {
    return (
        <hr
            className={`${styles.el} ${props.glow && styles.glow}`}
            style={{ "--color": props.color ? props.color : "#202020" }}
        />
    );
}
