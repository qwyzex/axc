import styles from "../styles/AccountInfo.module.sass";
import Confirmation from "./Confirmation";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";
import Buttons from "./Buttons";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "pages";

const AccountInfo = (props) => {
    const [user] = useAuthState(auth);
    const [confirmLogOut, setConfirmLogOut] = useState(false);

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
                    <Buttons
                        className={styles.logOutButton}
                        stateRef={confirmLogOut}
                        setStateRef={setConfirmLogOut}
                    />
                </div>
            </div>
            {confirmLogOut && (
                <Confirmation
                    title="Are You Sure You Want To Sign Out?"
                    event={() => {
                        signOut(auth);
                        setConfirmLogOut(!confirmLogOut);
                    }}
                    setStateRef={confirmLogOut ? setConfirmLogOut : null}
                    stateRef={confirmLogOut ? confirmLogOut : null}
                />
            )}
        </>
    );
};

export default AccountInfo;
