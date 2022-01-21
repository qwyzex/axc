import styles from "../styles/Overlay.module.sass";

const Overlay = (props) => {
    return (
        <div
            className={`
                ${styles.overlay} 
                ${props.blur === true && styles.blur}`}
        ></div>
    );
};

export default Overlay;
