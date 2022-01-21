import {
    signOut,
    GoogleAuthProvider,
    signInWithRedirect,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../pages/index";
import styles from "../styles/Buttons.module.sass";

const Buttons = (props, { children }) => {
    const [user] = useAuthState(auth);

    function userSignOut(user) {
        if (confirm("Are you sure want to sign out?")) {
            user
                ? signOut(auth)
                : console.log("No user, abort sign out...");
        } else {
            null;
        }
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    if (user) {
        return (
            <button
                onClick={userSignOut}
                className={`${props.className} ${styles.button} ${styles.logout}`}
            >
                {props.child}
                <p>
                    {props.signOutText
                        ? props.signOutText
                        : "Sign Out"}
                </p>
            </button>
        );
    } else {
        return (
            <button
                onClick={signInWithGoogle}
                className={`${props.className} ${styles.button} ${styles.login}`}
            >
                {props.child}
                <p>
                    {props.signInText ? props.signInText : "Sign In"}
                </p>
            </button>
        );
    }
};

export default Buttons;
