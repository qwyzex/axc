export interface ErrorComponentProps {
	message?: string;
}

const Error = (props: ErrorComponentProps) => {
	return (
		<div>
			<h1>ERROR!</h1>
			<p>{props.message ? props.message : 'An error occured!'}</p>
		</div>
	);
};

export const ErrorClient = (props: ErrorComponentProps) => {
	return (
		<div>
			<h1>ERROR!</h1>
			<p>
				{props.message
					? props.message
					: "An error occured on Clientside! Try refreshing, if it doesn't help please wait until I fixed it or contact me at qwyzex@yandex.com"}
			</p>
		</div>
	);
};

export const ErrorServer = (props: ErrorComponentProps) => {
	return (
		<div>
			<h1>ERROR!</h1>
			<p>
				{props.message
					? props.message
					: 'An error occured on the server! Please wait until I fixed it or contact me at qwyzex@yandex.com'}
			</p>
		</div>
	);
};

export default Error;
