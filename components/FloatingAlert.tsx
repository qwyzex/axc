import { useEffect, useState } from 'react';
import styles from '../styles/FloatingAlert.module.sass';

export interface FloatingAlertProps {
	level?: 'warn' | 'error' | 'success';
	message: string;
}

const FloatingAlert = (props: FloatingAlertProps) => {
	const className =
		props.level === 'warn'
			? styles.warning
			: props.level === 'error'
			? styles.error
			: props.level === 'success'
			? styles.success
			: styles.message;

	const [message, setMessage] = useState('');

	useEffect(() => {
		setMessage(props.message);
	}, [props.message]);

	return (
		<div
			className={`${className} ${styles.alert} ${
				message !== '' ? styles.show : ''
			} `}
			style={{
				zIndex: 20,
			}}
		>
			<p>{message}</p>
		</div>
	);
};

export default FloatingAlert;
