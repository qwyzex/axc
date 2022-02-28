import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import firerr from 'firerr';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { FloatingAlert } from '..';
import { useNotifications } from '@mantine/notifications';
import { firerrMantine } from '../../functions';

const SignInForm = () => {
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formValuePassword, setFormValuePassword] = useState('');
	const [formError, setFormError] = useState('');
	const [loading, setLoading] = useState(false);

	const notif = useNotifications();

	async function signIn(e: any) {
		e.preventDefault();
		setLoading(true);
		await signInWithEmailAndPassword(
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
			<FloatingAlert message={formError} level="error" />
			<h1>SIGN IN</h1>
			<form onSubmit={signIn}>
				<div>
					<label>EMAIL</label>
					<input
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
						value={!loading ? 'Sign In' : 'Loading...'}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
