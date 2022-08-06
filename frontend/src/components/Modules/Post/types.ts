import type { Props_Community } from 'src/components/Layouts/Community/types';
import type { Props_DataModel, Props_User } from 'src/types';

export interface Props_Voteable extends Props_DataModel {
	votes: number;

	user: Props_User;

	vote_type: 'upvote' | 'downvote' | 'neutral';
}

export interface Props_Post<CommentT, ContentT> extends Props_Voteable {
	comments: CommentT;
	community: Props_Community<null, number>;

	title: string;
	content: ContentT;
	content_type: 'text' | 'video' | 'image' | 'link' | 'any';
}

export interface Props_PostComment<ReplyT> extends Props_Voteable {
	post: number;
	replies: ReplyT;

	text: string;
}

export interface Props_PostReply extends Props_PostComment<number> {}
