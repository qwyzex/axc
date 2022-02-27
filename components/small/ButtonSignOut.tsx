import { ButtonsProps } from './Buttons';
import styles from '../../styles/Buttons.module.sass';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useModals } from '@mantine/modals';
import Router from 'next/router';
import { SVG } from '..';

const ButtonSignOut = (props: ButtonsProps) => {
	const modals = useModals();

	const signOutModal = () => {
		modals.openModal({
			title: 'Are You Sure You Want To Sign Out?',
			hideCloseButton: true,
			children: (
				<form
					onSubmit={(e: any) => {
						e.preventDefault();
						if (Router.pathname.match(/^\/$/)) {
							props.setActivePage!('landing');
							signOut(auth);
							modals.closeAll();
						} else {
							signOut(auth);
							modals.closeAll();
						}
					}}
					style={{
						display: 'flex',
						gap: '1rem',
					}}
				>
					<button type="submit" className="global err" autoFocus>
						YES
					</button>
					<button
						type="button"
						className="global"
						onClick={() => modals.closeAll()}
					>
						CANCEL
					</button>
				</form>
			),
		});
	};

	return (
		<button
			onClick={signOutModal}
			className={`${props.className} ${styles.button} ${styles.logout}`}
		>
			{props.child}
			<SVG.LogOut />
			<p style={{ fontWeight: props.bold ? 'bold' : 'normal' }}>
				{props.signOutText ? props.signOutText : 'Sign Out'}
			</p>
		</button>
	);
};

export default ButtonSignOut;
