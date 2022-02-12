import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import styles from '../styles/Buttons.module.sass';
import firerr from 'firerr';
import { Dispatch, SetStateAction } from 'react';

export interface ButtonsProps {
	setErrors: Dispatch<SetStateAction<string>>;
	setConfirmationStateRef: Dispatch<SetStateAction<boolean>> | void;
	confirmationStateRef: boolean;

	child?: any;
	className?: string;

	signOutText?: string;
	signInText?: string;
	identifier?: string;

	col?: boolean;
	bold?: boolean;
}

const Buttons = (props: ButtonsProps) => {
	const [user] = useAuthState(auth);

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(() => {
				props.setErrors('');
			})
			.catch((error) => {
				const code = error.code;
				console.warn(code);
				firerr(code, props.setErrors);
			});
	}

	if (user) {
		return (
			<div>
				<button
					onClick={() =>
						// @ts-ignore
						props.setConfirmationStateRef(
							!props.confirmationStateRef
						)
					}
					className={`${props.className} ${styles.button} ${styles.logout}`}
				>
					{props.child}
					<p>{props.signOutText ? props.signOutText : 'Sign Out'}</p>
				</button>
			</div>
		);
	} else {
		return (
			<button
				onClick={signInWithGoogle}
				className={`${props.className} ${styles.button} ${
					styles.login
				} ${props.col && styles.col}`}
			>
				{props.child}
				<p style={{ fontWeight: props.bold ? 'bold' : 'normal' }}>
					{props.signInText ? props.signInText : 'Sign In'}
				</p>
				<span>{props.identifier}</span>
			</button>
		);
	}
};

export default Buttons;
