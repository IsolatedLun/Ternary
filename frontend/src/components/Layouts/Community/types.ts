import type { Props_User } from 'src/types';

export interface Props_Community<PostT, MemberT> {
	id: number;

	members: MemberT;
	posts: PostT;

	name: string;

	profile: string;
	banner: string;

	date_created: string;
}

export interface Props_CommunityUser {
	user: Props_User;

	is_owner: boolean;
	is_moderator: boolean;
}
