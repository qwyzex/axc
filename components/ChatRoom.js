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
} from "firebase/firestore";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Confirmation from "./Confirmation";

const ChatRoom = () => {
    const scrollDummy = useRef();

    const messagesRef = collection(db, "messages");

    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(150));

    const [messages] = useCollectionData(q, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    async function sendMessage(e) {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        await addDoc(messagesRef, {
            text: formValue,
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

    return (
        <div className={styles.chatRoom}>
            <section className={styles.messageContainer}>
                <span ref={scrollDummy}></span>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            message={msg}
                            usrId={msg.uid}
                            msgId={msg.id}
                        />
                    ))}
            </section>
            <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                    className={formValue === "" && styles.empty}
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
                    setStateRef={setDeleteConfirm}
                    stateRef={deleteConfirm}
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
            />
            <div className={styles.messageBody}>
                <p className={styles.messageUsername}>{displayName}</p>
                <p className={styles.messageText}>{text}</p>
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
