import type { Props_Community } from 'src/components/Layouts/Community/types';
import type { Props_Post } from '../components/Modules/Post/types';
import type { Props_User } from '../types';

export interface ErrorResponse {
	response: {
		data: {
			detail: string;
		};

		status: number;
	};
}

export interface Props_CreatePost {
	title: string;
	content_type: string;

	communityId: number;

	content: any;
}

export interface Props_PostCommentData {
	text: string;
	postId: number;
}

export interface Props_PostCommentReplyData extends Props_PostCommentData {
	commentId: number;
	reply_to_id: number;

	type: 'comment' | 'reply';
}

export interface Props_VotePostData {
	votes: number;
	postId: number;
	type: string;
}

export interface Props_VoteCommentData extends Props_VotePostData {
	commentId: number;
}

export interface Props_VoteCommentReplyData extends Props_VoteCommentData {
	replyId: number;
}

export interface Props_Tokens<T> {
	refresh: T;
	access: T;
}

export interface Props_CreateHeaderOptions {
	auth?: boolean | null;
	formData?: boolean | null;
}

export interface Props_UserViewData extends Props_User {
	posts: Props_Post<number, any>[];
	communities: Props_Community<null, number>[];
}
