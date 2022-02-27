import { NextApiRequest, NextApiResponse } from 'next';

interface FeatureType {
	name: string;
	description?: string;
}

export interface ChangelogDataType {
	version: string;
	date: string;
	description: string;
	feature?: FeatureType[];
}

const data: ChangelogDataType[] = [
	{
		version: '1.0.0',
		date: 'January 22th 2022',
		description: 'Initialize release',
		feature: [
			{
				name: 'Account Info Component',
				description:
					'User can see who they were logged-in as, can be accessed from the menu.',
			},
			{
				name: 'App Info Component',
				description:
					"User can see the App's information, the version and source code link. can be accessed from the menu.",
			},
			{
				name: 'Okay Landing Page',
				description: 'Built a landing page for new user.',
			},
			{
				name: 'Fully Functional Skeleton',
				description: 'Fully functional messaging app, it works',
			},
			{
				name: 'Delete Message',
				description:
					"User can delete message if the message UID and User's UID is equal.",
			},
			{
				name: 'Custom Confirmation Block',
			},
		],
	},
	{
		version: '2.0.3',
		date: 'February 27th 2022',
		description: 'Big Update! Mantine, Email and Password SignIn',
		feature: [
			{
				name: 'Email and Password Sign In',
				description: 'User can sign in with email and password',
			},
			{
				name: 'Password Reset',
				description:
					'User can reset their password (only for email sign in)',
			},
			{
				name: 'Mantine React Component Library',
				description:
					'Use Mantine, A React Component Library. Specifically, using their notification, modals and some core APIs',
			},
			{
				name: 'Improved Landing Page UI',
				description:
					"Improved the UI of the landing page, it's now more user friendly. Change the landing page background to rainbow gradient mesh",
			},
			{
				name: 'Fixes bugs and some tweaks',
			},
		],
	},
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(data);
}
