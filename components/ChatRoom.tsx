/* eslint-disable @next/next/no-img-element */
import { db, auth } from '../firebase';
import styles from '../styles/ChatRoom.module.sass';
import {
	collection,
	orderBy,
	query,
	addDoc,
	serverTimestamp,
	limit,
	deleteDoc,
	doc,
	CollectionReference,
	DocumentData,
	Query,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Confirmation from './Confirmation';
import { SpinnerDiamond } from 'spinners-react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

const ChatRoom = () => {
	const scrollDummy: any = useRef();
	const [loading, setLoading] = useState(true);

	const messagesRef: CollectionReference<DocumentData> = collection(
		db,
		process.env.NODE_ENV === 'development' ? 'devmessages' : 'messages'
	);
	const q: Query = query(
		messagesRef,
		orderBy('createdAt', 'desc'),
		limit(150)
	);

	const [messages] = useCollectionData(q, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
	// console.log(messages);

	async function sendMessage(e: any) {
		e.preventDefault();
		const { uid, photoURL, displayName }: string | any = auth.currentUser;
		await addDoc(messagesRef, {
			text: Buffer.from(formValue, 'utf8').toString('base64'),
			createdAt: serverTimestamp(),
			displayName,
			uid,
			photoURL,
		})
			.then(() => {
				setFormValue('');
				scrollDummy?.current.scrollIntoView({ behavior: 'smooth' });
			})
			.catch((error) => {
				const code: string = error.code;

				console.log(error.code);
				console.log(error.type);
				console.log(error.message);
			});
	}

	const SubmitButton = () => {
		return formValue === '' ? (
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
		if (messages) {
			setLoading(false);
		}
	}, [messages]);

	return (
		<div className={styles.chatRoom}>
			<ul
				className={`${styles.messageContainer} ${
					loading && styles.loading
				}`}
			>
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
					messages.map((msg: Data<DocumentData, '', ''>) => (
						<ChatMessage
							message={msg}
							key={msg.id}
							usrId={msg.uid}
							msgId={msg.id}
						/>
					))
				)}
			</ul>
			<form onSubmit={sendMessage} className={styles.messageForm}>
				<input
					className={formValue === '' ? styles.empty : ''}
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

export interface ChatMessageProps {
	message: Data<DocumentData, '', ''>;
	msgId: string;
	usrId: string;
}

const ChatMessage = (props: ChatMessageProps) => {
	const { text, uid, photoURL, displayName } = props.message;
	const messageClass =
		uid === auth.currentUser!.uid ? styles.sent : styles.received;

	// delete function
	const messagesRef = collection(
		db,
		process.env.NODE_ENV === 'development' ? 'devmessages' : 'messages'
	);
	const docRef = doc(messagesRef, props.msgId);
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	return (
		<li className={`message ${messageClass} ${styles.messageWrapper}`}>
			{deleteConfirm && (
				<Confirmation
					event={async () => await deleteDoc(docRef)}
					setStateRef={deleteConfirm ? setDeleteConfirm : () => {}}
					stateRef={deleteConfirm ? deleteConfirm : false}
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
					{Buffer.from(text, 'base64').toString('utf8')}
				</p>
				{props.usrId === auth.currentUser!.uid && (
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
