import Router from 'next/router';
import { useEffect } from 'react';

export default function Page404() {
	useEffect(() => {
		Router.push('/');
	}, []);
	return <div></div>;
}
