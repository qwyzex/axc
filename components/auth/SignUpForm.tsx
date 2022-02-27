import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import firerr from 'firerr';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { FloatingAlert } from '..';
import { firerrMantine } from '../../functions';
import { useNotifications } from '@mantine/notifications';

const SignUpForm = () => {
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formValuePassword, setFormValuePassword] = useState('');
	const [formError, setFormError] = useState('');
	const [loading, setLoading] = useState(false);

	const notif = useNotifications();

	async function signUp(e: any) {
		e.preventDefault();
		setLoading(true);
		await createUserWithEmailAndPassword(
			auth,
			formValueEmail,
			formValuePassword
		)
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				notif.showNotification({
					title: err.code
						.replace(/^auth\//, '')
						.replace(/\-/g, ' ')
						.toUpperCase(),
					message: firerrMantine(err.code),
					autoClose: 5000,
					color: 'red',
				});
			});
	}

	return (
		<div>
			<h1>SIGN UP</h1>
			<form onSubmit={signUp} autoComplete={'off'}>
				<div>
					<label>EMAIL</label>
					<input
						autoComplete="nope"
						disabled={loading ? true : false}
						type="email"
						value={formValueEmail}
						onChange={(e) => setFormValueEmail(e.target.value)}
						placeholder="Your email address"
					/>
				</div>
				<div>
					<label>PASSWORD</label>
					<input
						autoComplete="new-password"
						disabled={loading ? true : false}
						type="password"
						value={formValuePassword}
						onChange={(e) => setFormValuePassword(e.target.value)}
						placeholder="Your password"
					/>
				</div>
				<div>
					<input
						disabled={loading ? true : false}
						type="submit"
						value={!loading ? 'Sign Up' : 'Loading...'}
					/>
				</div>
			</form>
			<FloatingAlert message={formError} level="error" />
		</div>
	);
};

export default SignUpForm;
