import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../pages/index";
import styles from "../styles/Buttons.module.sass";

const Buttons = (props) => {
    const [user] = useAuthState(auth);

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    if (user) {
        return (
            <div>
                <button
                    onClick={() => props.setStateRef(!props.stateRef)}
                    className={`${props.className} ${styles.button} ${styles.logout}`}
                >
                    {props.child}
                    <p>{props.signOutText ? props.signOutText : "Sign Out"}</p>
                </button>
            </div>
        );
    } else {
        return (
            <button
                onClick={signInWithGoogle}
                className={`${props.className} ${styles.button} ${styles.login} ${
                    props.col && styles.col
                }`}
            >
                {props.child}
                <p style={{ fontWeight: props.bold && "bold" }}>
                    {props.signInText ? props.signInText : "Sign In"}
                </p>
                <span>{props.identifier}</span>
            </button>
        );
    }
};

export default Buttons;
