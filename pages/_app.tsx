import '../styles/globals.sass';
import type { AppProps } from 'next/app';

import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { Text, Button, MantineProvider, Divider } from '@mantine/core';
import { AnchorButton } from '../components';
import { NotificationsProvider } from '@mantine/notifications';
import AccountInfo from '~//mantine/AccountInfo';

const appInfoModal = ({ context, id }: ContextModalProps) => (
	<>
		<Divider />
		<h1>AXC</h1>
		<article>
			<Text>
				This is a simple app that allows you to chat with other users.
				This app was created by{' '}
				<a
					href="https://github.com/qwyzex"
					target="_blank"
					rel="noreferrer"
				>
					@qwyzex
				</a>
			</Text>
			<br />
			<Text>
				Veniam aliquip incididunt est tempor excepteur incididunt
				pariatur voluptate elit nostrud labore Lorem nulla. Magna
				aliquip mollit laboris sit voluptate. Qui velit sit eu nostrud
				anim irure do consequat cupidatat eu do eiusmod aute commodo.
				Voluptate ex consequat occaecat amet deserunt esse ut ad.
			</Text>
			<br />
			<Text>
				Irure Lorem aliqua minim adipisicing velit incididunt cillum
				cillum officia sit. Cupidatat commodo ex Lorem laboris fugiat
				quis magna ipsum ut eiusmod. Incididunt est commodo aute
				voluptate aute cillum
			</Text>
		</article>
		<br />
		<Divider />
		<br />
		<footer
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '.5rem',
			}}
		>
			<AnchorButton
				to="https://github.com/qwyzex/axc"
				newtab
				light
				bold
				primary
				fullWitdh
				// invertClick
				color="280"
			>
				GitHub Repository
			</AnchorButton>
			<AnchorButton
				to="https://fitexx.vercel.app"
				newtab
				dark
				bold
				fullWitdh
				invertClick
				color="154"
			>
				Try FitexX
			</AnchorButton>
		</footer>
	</>
);

function AXC({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider>
			<NotificationsProvider>
				<ModalsProvider
					modals={{
						appInfo: appInfoModal,
					}}
				>
					<Component {...pageProps} />
				</ModalsProvider>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default AXC;
