import { SVGClose } from './Svg';

const CloseButton = ({ event }: any) => {
	return (
		<button onClick={event}>
			<SVGClose />
		</button>
	);
};

export default CloseButton;
