import type { Props_User } from 'src/types';

export interface Props_GroupInvite {
	id: number;
	members: number;

	profile: string;
	name: string;
}

export interface Props_MiscPost {
	id: number;
	votes: number;

	title: string;

	user: Props_User;
}
