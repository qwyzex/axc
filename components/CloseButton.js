import { SVGClose } from "./Svg";

const CloseButton = (props) => {
    return (
        <button onClick={props.event}>
            <SVGClose />
        </button>
    );
};

export default CloseButton;
