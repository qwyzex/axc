import { sendPasswordResetEmail } from 'firebase/auth';
import firerr from 'firerr';
import { useState } from 'react';
import { auth } from '../firebase';
import FloatingAlert from './FloatingAlert';

const ResetPasswordForm = () => {
	const [formValueEmail, setFormValueEmail] = useState('');
	const [formError, setFormError] = useState('');

	async function sendEmail(e: any) {
		e.preventDefault();
		await sendPasswordResetEmail(auth, formValueEmail)
			.then(() => {})
			.catch((err) => {
				const code = err.code;
				firerr(code, setFormError);
			});
	}

	return (
		<div>
			<form onSubmit={sendEmail}>
				<div>
					<input
						type="email"
						value={formValueEmail}
						onChange={(e) => setFormValueEmail(e.target.value)}
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
