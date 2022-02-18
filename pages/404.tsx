import Router from 'next/router';
import { useEffect } from 'react';

export default function Error() {
	useEffect(() => {
		Router.push('/');
	});
	return <></>;
}
