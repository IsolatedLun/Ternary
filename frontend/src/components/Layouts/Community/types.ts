export interface Props_Community<PostT, MemberT> {
	id: number;

	members: MemberT;
	posts: PostT;

	name: string;

	profile: string;
	banner: string;

	date_created: string;
}
