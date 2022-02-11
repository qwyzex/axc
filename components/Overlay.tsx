import styles from '../styles/Overlay.module.sass';

const Overlay = ({ blur }: any) => {
	return (
		<div
			className={`
                ${styles.overlay} 
                ${blur === true && styles.blur}`}
		></div>
	);
};

export default Overlay;
