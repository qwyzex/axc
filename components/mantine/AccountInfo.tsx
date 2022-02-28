/* eslint-disable @next/next/no-img-element */
import { Divider } from '@mantine/core';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loading } from '..';
import { ChatRoomProps } from '../main/ChatRoom';
import ButtonSignOut from '../small/ButtonSignOut';
import styles from '../../styles/AccountInfo.module.sass';

const AccountInfo = (props: ChatRoomProps) => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (props.userData) {
			setLoading(false);
		}
	}, [props.userData]);

	return (
		<>
			<Divider />
			<br />
			{loading ? (
				<Loading />
			) : (
				<section className={styles.container}>
					<div>
						<img
							width={90}
							height={90}
							src={props.userData!.photoURL}
							alt={`${props.userData!.displayName}`}
						/>
					</div>
					<br />
					<div>
						<label className="cascade">username</label>
						<h3>{props.userData!.displayName}</h3>
					</div>
					<div>
						<label className="cascade">email</label>
						<p>{props.userData!.email}</p>
					</div>
					<br />
					<Divider />
					<br />
					<div>
						<ButtonSignOut setActivePage={props.setActivePage} />
					</div>
				</section>
			)}
		</>
	);
};

export default AccountInfo;
