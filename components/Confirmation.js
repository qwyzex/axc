import Overlay from "./Overlay";
import styles from "../styles/Confirmation.module.sass";

const Confirmation = (props) => {
    return props.stateRef ? (
        <>
            <Overlay />
            <div className={`popup ${styles.container}`}>
                <div>
                    <h1>{props.title ? props.title : "Are You Sure?"}</h1>
                    {props.message ? <p>{props.message}</p> : null}
                </div>
                <div>
                    <button className={styles.confirm} onClick={props.event} autoFocus>
                        {props.confirmText ? props.confirmText : "YES"}
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={() => props.setStateRef(!props.stateRef)}
                    >
                        {props.cancelText ? props.cancelText : "NO"}
                    </button>
                </div>
            </div>
        </>
    ) : null;
};

export default Confirmation;
