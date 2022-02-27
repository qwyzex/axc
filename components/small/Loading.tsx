import { SpinnerCircular } from 'spinners-react';

export interface LoadingProps {
	size?: number;
	thickness?: number;
	color?: string;
	secColor?: string;
	className?: string;
}

const Loading = (props: LoadingProps) => {
	return (
		<SpinnerCircular
			thickness={props.thickness ? props.thickness : 250}
			size={props.size ? props.size : 50}
			color={props.color ? props.color : 'var(--blue)'}
			secondaryColor={props.secColor ? props.secColor : '#e8e8e830'}
			className={props.className}
		/>
	);
};

export default Loading;
