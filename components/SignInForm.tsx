import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import firerr from 'firerr';
import { useState } from 'react';
import { auth, db } from '../firebase';
import FloatingAlert from './FloatingAlert';

const SignInForm = () => {
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formValuePassword, setFormValuePassword] = useState('');
	const [formError, setFormError] = useState('');

	async function signIn(e: any) {
		e.preventDefault();

		await signInWithEmailAndPassword(
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
			<FloatingAlert message={formError} level="error" />
			<h1>SIGN IN</h1>
			<form onSubmit={signIn}>
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
					<input type="submit" value={'Sign In'} />
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
