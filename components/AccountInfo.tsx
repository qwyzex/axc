/* eslint-disable @next/next/no-img-element */
import styles from '../styles/AccountInfo.module.sass';
import Confirmation from './Confirmation';
import CloseButton from './CloseButton';
import Overlay from './Overlay';
import Buttons from './Buttons';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import FloatingAlert from './FloatingAlert';

const AccountInfo = ({ close }: any) => {
	const [user]: any = useAuthState(auth);
	const [confirmLogOut, setConfirmLogOut] = useState(false);
	const [componentError, setComponentError] = useState('');

	return (
		<>
			<FloatingAlert message={componentError} level={'error'} />
			<Overlay blur={true} />
			<div className={`popup ${styles.container}`}>
				<header>
					<h1>Account Information</h1>
					<CloseButton event={close} />
				</header>
				<div>
					<img
						src={user!.photoURL}
						alt={`${user!.displayName}'s Profile Picture`}
					/>
					<div>
						<label className="cascade">username</label>
						<h3>{user!.displayName}</h3>
					</div>
					<div>
						<label className="cascade">email</label>
						<p>{user!.email}</p>
					</div>
					<Buttons
						className={styles.logOutButton}
						setErrors={setComponentError}
						confirmationStateRef={confirmLogOut}
						setConfirmationStateRef={setConfirmLogOut}
					/>
				</div>
			</div>
			{confirmLogOut && (
				<Confirmation
					title="Are You Sure You Want To Sign Out?"
					event={() => {
						signOut(auth);
						setConfirmLogOut(!confirmLogOut);
					}}
					setStateRef={confirmLogOut ? setConfirmLogOut : () => {}}
					stateRef={confirmLogOut ? confirmLogOut : false}
				/>
			)}
		</>
	);
};

export default AccountInfo;
