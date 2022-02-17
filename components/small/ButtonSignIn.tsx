import styles from '../../styles/Buttons.module.sass';
import { ButtonsProps } from './Buttons';

const ButtonSignIn = (props: ButtonsProps) => {
	return (
		<button
			onClick={() => props.setActivePage('signIn')}
			className={`${props.className} ${styles.button} ${styles.login} ${
				props.col && styles.col
			}`}
		>
			{props.child}
			<p style={{ fontWeight: props.bold ? 'bold' : 'normal' }}>
				{props.signInText ? props.signInText : 'Sign In'}
			</p>
			<span>{props.identifier}</span>
		</button>
	);
};

export default ButtonSignIn;
