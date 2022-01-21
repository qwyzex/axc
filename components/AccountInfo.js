import { SVGClose } from "./Svg";
import Overlay from "./Overlay";
import styles from "../styles/AccountInfo.module.sass";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "pages";
import Buttons from "./Buttons";
import CloseButton from "./CloseButton";

const AccountInfo = (props) => {
    const [user] = useAuthState(auth);

    return (
        <>
            <Overlay blur={true} />
            <div className={`popup ${styles.container}`}>
                <header>
                    <h1>Account Information</h1>
                    <CloseButton event={props.close} />
                </header>
                <div>
                    <img
                        src={user.photoURL}
                        alt={`${user.displayName}'s Profile Picture`}
                    />
                    <div>
                        <label className="cascade">username</label>
                        <h3>{user.displayName}</h3>
                    </div>
                    <div>
                        <label className="cascade">email</label>
                        <p>{user.email}</p>
                    </div>
                    <Buttons className={styles.logOutButton} />
                </div>
            </div>
        </>
    );
};

export default AccountInfo;
