import styles from '../styles/FloatingAlert.module.sass';

export interface FloatingAlertProps {
	level?: 'warn' | 'error';
	stateVar: string;
	message: string;
}

const FloatingAlert = (props: FloatingAlertProps) => {
	const className =
		props.level === 'warn' ? 'warning' : 'error' ? 'error' : 'message';

	return (
		<div
			className={`${className} ${props.stateVar !== '' && styles.show} ${
				styles.alert
			}`}
		>
			<p>{props.message}</p>
		</div>
	);
};

export default FloatingAlert;
