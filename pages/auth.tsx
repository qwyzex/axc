import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
} from 'firebase/auth';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNotifications } from '@mantine/notifications';

import styles from '/styles/AuthForm.module.sass';
import {
	Header,
	Loading,
	ResetPasswordForm,
	SignInForm,
	SignUpForm,
} from '../components';
import { auth } from '../firebase';
import { IndexTypes } from '.';
import { firerrMantine, getUserData, redirect } from '../functions';
import { AuthFormProps } from '~//auth/AuthForm';
import { DocumentData } from 'firebase/firestore';
import Head from 'next/head';

export default function AuthForm() {
	const [activeTab, setActiveTab] = useState('signIn');
	const [userData, setUserData] = useState<DocumentData>({});
	const [loading, setLoading] = useState(true);

	const notif = useNotifications();

	useEffect(() => {
		getUserData(setUserData);
	}, [userData]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				redirect('/');
				setLoading(false);
			} else {
				setLoading(false);
			}
		});
	}, []);

	return (
		<>
			<Head>
				<title>
					AXC{' '}
					{activeTab === 'signIn'
						? 'Sign In'
						: activeTab === 'signUp'
						? 'Sign Up'
						: 'Reset Password'}
				</title>
				<meta
					name="description"
					content="Sign Up To AXC And Globally Chat People Around The World! < Not Really... :( >"
				/>
			</Head>
			<Header userData={userData} />
			<main className="mainRoot">
				{loading ? (
					<Loading />
				) : (
					<div className={styles.container}>
						<header className={styles.header}>
							<button
								type="button"
								className="global err"
								onClick={() => redirect('/')}
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
								{activeTab === 'signIn' ||
								activeTab === 'resetPassword' ? (
									<>
										<div>
											{activeTab === 'signIn' ? (
												<>
													<p>Forgot Your Password?</p>
													<button
														type="button"
														onClick={() =>
															setActiveTab(
																'resetPassword'
															)
														}
													>
														Reset Password
													</button>
												</>
											) : (
												<>
													<p>
														Remember Your Password?
													</p>
													<button
														type="button"
														onClick={() =>
															setActiveTab(
																'signIn'
															)
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
												onClick={() =>
													setActiveTab('signUp')
												}
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
											onClick={() =>
												setActiveTab('signIn')
											}
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
										const provider =
											new GoogleAuthProvider();
										signInWithPopup(auth, provider).catch(
											(err) => {
												notif.showNotification({
													title: err.code
														.replace(/^auth\//, '')
														.replace(/\-/g, ' ')
														.toUpperCase(),
													message: firerrMantine(
														err.code
													),
													autoClose: 5000,
													color: 'red',
												});
											}
										);
									}}
								>
									CONTINUE WITH GOOGLE
								</button>
							</div>
						</footer>
					</div>
				)}
			</main>
		</>
	);
}
