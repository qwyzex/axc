import { SpinnerCircular } from 'spinners-react';

export interface LoadingProps {
	color?: string;
	secondaryColor?: string;
	thickness?: number;
}

const Loading = (props: LoadingProps) => {
	return (
		<SpinnerCircular
			color={props.color ? props.color : '#ffffff'}
			secondaryColor={
				props.secondaryColor ? props.secondaryColor : '#e6e6e6'
			}
			thickness={props.thickness ? props.thickness : 150}
		/>
	);
};

export default Loading;
