import { useState } from 'react';

import ResetPasswordForm from './ResetPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthForm() {
	const [activeTab, setActiveTab] = useState('signIn');

	return (
		<div>
			<main>
				{activeTab === 'signIn' ? (
					<SignInForm />
				) : activeTab === 'resetPassword' ? (
					<ResetPasswordForm />
				) : (
					<SignUpForm />
				)}
			</main>
			<footer>
				<nav>
					{activeTab === 'signIn' || activeTab === 'resetPassword' ? (
						<>
							<div>
								{activeTab === 'signIn' ? (
									<>
										<p>Forgot Your Password?</p>
										<button
											onClick={() =>
												setActiveTab('resetPassword')
											}
										>
											Reset Password
										</button>
									</>
								) : (
									<>
										<p>Remember Your Password?</p>
										<button
											onClick={() =>
												setActiveTab('signIn')
											}
										>
											Sign In
										</button>
									</>
								)}
							</div>
							<div>
								<p>Don{"'"}t have an account?</p>
								<button onClick={() => setActiveTab('signUp')}>
									Sign Up
								</button>
							</div>
						</>
					) : (
						<div>
							<p>Already have an account?</p>
							<button onClick={() => setActiveTab('signIn')}>
								Sign In
							</button>
						</div>
					)}
				</nav>
			</footer>
		</div>
	);
}
