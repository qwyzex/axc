import styles from '../styles/FloatingAlert.module.sass';

const FloatingAlert = ({ message, level, stateVar }) => {
	const className =
		level === 'warn' ? 'warning' : 'error' ? 'error' : 'message';

	return (
		<div
			className={`${className} ${stateVar !== '' && styles.show} ${
				styles.alert
			}`}
		>
			<p>{message}</p>
		</div>
	);
};

export default FloatingAlert;
