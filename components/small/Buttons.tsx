import { Dispatch, SetStateAction } from 'react';

export interface ButtonsProps {
	setActivePage: Dispatch<
		SetStateAction<'landing' | 'chatRoom' | 'signIn' | 'loading'>
	>;

	child?: any;
	className?: string;

	signOutText?: string;
	signInText?: string;
	identifier?: string;

	col?: boolean;
	bold?: boolean;
}
