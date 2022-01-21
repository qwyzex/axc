import Overlay from "./Overlay";
import styles from "../styles/Confirmation.module.sass";

const Confirmation = (props) => {
    return props.state ? (
        <>
            <Overlay />
            <div className={`popup ${styles.container}`}>
                <div>
                    <h1>
                        {props.title ? props.title : "Are You Sure?"}
                    </h1>
                    {props.message ? <p>{props.message}</p> : null}
                </div>
                <div>
                    <button
                        className={styles.confirm}
                        onClick={props.event}
                    >
                        {props.confirmText
                            ? props.confirmText
                            : "YES"}
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={() => props.setState(!props.state)}
                    >
                        {props.cancelText ? props.cancelText : "NO"}
                    </button>
                </div>
            </div>
        </>
    ) : null;
};

export default Confirmation;
