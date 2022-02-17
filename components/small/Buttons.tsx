import { Dispatch, SetStateAction } from 'react';
import { ChatRoomProps } from '../main/ChatRoom';

export interface ButtonsProps {
	setActivePage: ChatRoomProps['setActivePage'];

	child?: any;
	className?: string;

	signOutText?: string;
	signInText?: string;
	identifier?: string;

	col?: boolean;
	bold?: boolean;
}
