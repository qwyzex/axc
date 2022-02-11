import '../styles/globals.sass';
import type { AppProps } from 'next/app';

function AXC({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default AXC;
