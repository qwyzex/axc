import Router from 'next/router';
import styles from '../../styles/Buttons.module.sass';
import { ButtonsProps } from './Buttons';

const ButtonSignIn = (props: ButtonsProps) => {
	return (
		<button
			onClick={() => {
				if (Router.pathname.match(/^\/$/)) {
					props.setActivePage!('signIn');
				} else {
					Router.replace('/auth');
				}
			}}
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
