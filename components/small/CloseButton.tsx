import { SVG } from '..';

const CloseButton = ({ event }: any) => {
	return (
		<button onClick={event}>
			<SVG.Close />
		</button>
	);
};

export default CloseButton;
