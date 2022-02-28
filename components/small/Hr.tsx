import styles from '/styles/Hr.module.sass';

interface HrProps {
	glow?: boolean;
	color?: string;
}

export default function Hr(props: HrProps) {
	return (
		<hr
			className={`${styles.el} ${props.glow && styles.glow}`}
			// @ts-ignore
			style={{ '--color': props.color ? props.color : '#202020' }}
		/>
	);
}
