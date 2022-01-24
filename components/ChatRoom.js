import { db, auth } from "../pages/index";
import styles from "../styles/ChatRoom.module.sass";
import {
    collection,
    orderBy,
    query,
    addDoc,
    serverTimestamp,
    limit,
    deleteDoc,
    doc,
    where,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Confirmation from "./Confirmation";
import { SpinnerDiamond } from "spinners-react";

const ChatRoom = () => {
    const scrollDummy = useRef();
    const [loading, setLoading] = useState(true);

    const messagesRef = collection(
        db,
        process.env.NODE_ENV === "development" ? "devmessages" : "messages"
    );
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(150));

    const [messages] = useCollectionData(q, { idField: "id" });
    const [formValue, setFormValue] = useState("");
    console.log(messages);

    async function sendMessage(e) {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        await addDoc(messagesRef, {
            text: Buffer.from(formValue, "utf8").toString("base64"),
            createdAt: serverTimestamp(),
            displayName,
            uid,
            photoURL,
        });
        setFormValue("");
        scrollDummy.current.scrollIntoView({ behavior: "smooth" });
    }

    const SubmitButton = () => {
        return formValue === "" ? (
            <button type="submit" className={styles.sendButton} disabled>
                SEND
            </button>
        ) : (
            <button type="submit" className={styles.sendButton}>
                SEND
            </button>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
<<<<<<< HEAD
        }, 400);
=======
        }, 600);
>>>>>>> 3b34422add5ec5a2c7cdc17f15f5a0f33fe1ccb1
    }, []);

    return (
        <div className={styles.chatRoom}>
            <ul className={`${styles.messageContainer} ${loading && styles.loading}`}>
                <span ref={scrollDummy}></span>
                {loading ? (
                    <>
                        <h3>RETRIEVING DATA...</h3>
                        <SpinnerDiamond
                            color="#ff003c"
                            thickness={150}
                            size={75}
                            speed={140}
                        />
                    </>
                ) : (
                    messages &&
                    messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            message={msg}
                            usrId={msg.uid}
                            msgId={msg.id}
                        />
                    ))
                )}
            </ul>
            <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                    className={formValue === "" ? styles.empty : null}
                    required
                    autoFocus
                    onChange={(e) => setFormValue(e.target.value)}
                    value={formValue}
                    placeholder="Insert your message here..."
                />
                <SubmitButton />
            </form>
        </div>
    );
};

const ChatMessage = (props) => {
    const { text, uid, photoURL, displayName } = props.message;
    const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received;

    // delete function
    const messagesRef = collection(db, "messages");
    const docRef = doc(messagesRef, props.msgId);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    return (
        <li className={`message ${messageClass} ${styles.messageWrapper}`}>
            {deleteConfirm && (
                <Confirmation
                    event={async () => await deleteDoc(docRef)}
                    setStateRef={deleteConfirm ? setDeleteConfirm : null}
                    stateRef={deleteConfirm ? deleteConfirm : null}
                    title="Are you sure you want to delete the message?"
                    message="This action is permanent and can't be retrieved!"
                    confirmText="Yes, Delete"
                    cancelText="No, Abort"
                />
            )}
            <img
                src={photoURL}
                alt={`${displayName}'s Profile Picture`}
                className={styles.messageProfilePhoto}
                height={35}
                width={35}
            />
            <div className={styles.messageBody}>
                <p className={styles.messageUsername}>{displayName}</p>
                <p className={styles.messageText}>
                    {/* {text} */}
                    {Buffer.from(text, "base64").toString("utf8")}
                </p>
                {props.usrId === auth.currentUser.uid && (
                    <div className={styles.deleteButtonContainer}>
                        <button
                            className={styles.deleteMessageButton}
                            onClick={() => setDeleteConfirm(!deleteConfirm)}
                        ></button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default ChatRoom;
