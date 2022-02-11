import Overlay from './Overlay';
import styles from '../styles/Confirmation.module.sass';
import { Dispatch, SetStateAction } from 'react';

export interface ConfirmationProps {
	stateRef: boolean;
	setStateRef: Dispatch<SetStateAction<boolean>> | void;
	event: any;

	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
}

const Confirmation = (props: ConfirmationProps) => {
	return props.stateRef ? (
		<>
			<Overlay />
			<div className={`popup ${styles.container}`}>
				<div>
					<h1>{props.title ? props.title : 'Are You Sure?'}</h1>
					{props.message ? <p>{props.message}</p> : null}
				</div>
				<div>
					<button
						className={styles.confirm}
						onClick={props.event}
						autoFocus
					>
						{props.confirmText ? props.confirmText : 'YES'}
					</button>
					<button
						className={styles.cancel}
						// @ts-ignore
						onClick={() => props.setStateRef(!props.stateRef)}
					>
						{props.cancelText ? props.cancelText : 'NO'}
					</button>
				</div>
			</div>
		</>
	) : null;
};

export default Confirmation;
