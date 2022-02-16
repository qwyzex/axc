import styles from '/styles/AuthForm.module.sass';
import { IndexTypes } from '../../pages';
import { Dispatch, SetStateAction, useState } from 'react';
import { Buttons, ResetPasswordForm, SignInForm, SignUpForm } from '..';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

export interface AuthFormProps {
	setActivePage: Dispatch<SetStateAction<IndexTypes['activePage']>>;
}

export default function AuthForm(props: AuthFormProps) {
	const [activeTab, setActiveTab] = useState('signIn');

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<button
					type="button"
					className="global err"
					onClick={() => props.setActivePage('landing')}
				>
					{'<< '}BACK
				</button>
			</header>
			<main className={styles.main}>
				{activeTab === 'signIn' ? (
					<SignInForm />
				) : activeTab === 'signUp' ? (
					<SignUpForm />
				) : (
					<ResetPasswordForm />
				)}
			</main>
			<footer className={styles.footer}>
				<nav>
					{activeTab === 'signIn' || activeTab === 'resetPassword' ? (
						<>
							<div>
								{activeTab === 'signIn' ? (
									<>
										<p>Forgot Your Password?</p>
										<button
											type="button"
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
											type="button"
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
								<button
									type="button"
									onClick={() => setActiveTab('signUp')}
								>
									Sign Up
								</button>
							</div>
						</>
					) : (
						<div>
							<p>Already have an account?</p>
							<button
								type="button"
								onClick={() => setActiveTab('signIn')}
							>
								Sign In
							</button>
						</div>
					)}
				</nav>
				<br />
				<hr />
				<br />
				<div>
					<button
						onClick={() => {
							const provider = new GoogleAuthProvider();
							signInWithPopup(auth, provider);
						}}
					>
						CONTINUE WITH GOOGLE
					</button>
				</div>
			</footer>
		</div>
	);
}
