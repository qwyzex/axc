import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import firerr from 'firerr';
import { useState } from 'react';
import { auth, db } from '../firebase';
import FloatingAlert from './FloatingAlert';

const SignInForm = () => {
	// const [formValueUsername, setFormValueUsername] = useState('');
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formValuePassword, setFormValuePassword] = useState('');
	const [formError, setFormError] = useState('');

	async function signUp(e: any) {
		e.preventDefault();
		await createUserWithEmailAndPassword(
			auth,
			formValueEmail,
			formValuePassword
		)
			.then(() => {})
			.catch((err) => {
				firerr(err.code, setFormError);
			});
	}

	return (
		<div>
			<h1>SIGN UP</h1>
			<form onSubmit={signUp}>
				{/* <div>
					<input
						type="text"
						value={formValueUsername}
						onChange={(e) => setFormValueUsername(e.target.value)}
					/>
				</div> */}
				<div>
					<input
						type="email"
						value={formValueEmail}
						onChange={(e) => setFormValueEmail(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="password"
						value={formValuePassword}
						onChange={(e) => setFormValuePassword(e.target.value)}
					/>
				</div>
				<div>
					<input type="submit" value={'Sign Up'} />
				</div>
			</form>
			<FloatingAlert message={formError} level="error" />
		</div>
	);
};

export default SignInForm;
