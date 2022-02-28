import { sendPasswordResetEmail } from 'firebase/auth';
import firerr from 'firerr';
import { useState } from 'react';
import { auth } from '../../firebase';
import { FloatingAlert } from '..';
import { useNotifications } from '@mantine/notifications';
import { firerrMantine } from '../../functions';

const ResetPasswordForm = () => {
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formError, setFormError] = useState('');

	const notif = useNotifications();

	async function sendEmail(e: any) {
		e.preventDefault();
		await sendPasswordResetEmail(auth, formValueEmail)
			.then(() => {
				notif.showNotification({
					title: 'Success',
					message: 'Email sent',
					autoClose: 5000,
					color: 'green',
				});
			})
			.catch((err) => {
				const code = err.code;
				notif.showNotification({
					title: code
						.replace(/^auth\//, '')
						.replace(/\-/g, ' ')
						.toUpperCase(),
					message: firerrMantine(code),
					autoClose: false,
					color: 'red',
				});
			});
	}

	return (
		<div>
			<h1>Reset Password</h1>
			<form onSubmit={sendEmail}>
				<div>
					<label>EMAIL</label>
					<input
						type="email"
						value={formValueEmail}
						onChange={(e) => setFormValueEmail(e.target.value)}
						placeholder="Your email address"
					/>
				</div>
				<div>
					<input type="submit" value="Send Email" />
				</div>
			</form>
			<FloatingAlert message={formError} level="error" />
		</div>
	);
};

export default ResetPasswordForm;
