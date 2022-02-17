import { Divider } from '@mantine/core';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loading } from '..';
import { ChatRoomProps } from '../main/ChatRoom';
import ButtonSignOut from '../small/ButtonSignOut';

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
				<section>
					<div>
						<Image
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
