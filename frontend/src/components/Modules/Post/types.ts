import type { Props_DataModel, Props_User } from 'src/types';

export interface Props_Post<CommentT, ContentT> extends Props_DataModel {
	user: Props_User;

	votes: number;
	comments: CommentT;

	title: string;
	content: ContentT;
	content_type: 'text' | 'video' | 'image' | 'link' | 'any';
}

export interface Props_PostComment {
	post: number;
	user: Props_User;

	text: string;

	date_created: string;
}
