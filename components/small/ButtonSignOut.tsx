import { ButtonsProps } from './Buttons';
import styles from '../../styles/Buttons.module.sass';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useModals } from '@mantine/modals';

const ButtonSignOut = (props: ButtonsProps) => {
	const modals = useModals();

	const signOutModal = () => {
		modals.openConfirmModal({
			title: 'Are You Sure You Want To Sign Out?',
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => {
				props.setActivePage('landing');
				signOut(auth);
			},
		});
	};

	return (
		<button
			onClick={signOutModal}
			className={`${props.className} ${styles.button} ${styles.logout}`}
		>
			{props.child}
			<p style={{ fontWeight: props.bold ? 'bold' : 'normal' }}>
				{props.signOutText ? props.signOutText : 'Sign Out'}
			</p>
		</button>
	);
};

export default ButtonSignOut;
