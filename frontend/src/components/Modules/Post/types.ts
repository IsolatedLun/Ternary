import type { Props_DataModel, Props_User } from 'src/types';

export interface Props_Post<CommentT, ContentT> extends Props_DataModel {
	user: Props_User;

	votes: number;
	comments: CommentT | any;

	title: string;
	content: Props_Post_Content_Text | Props_Post_Content_Image | Props_Post_Content_Video;
	content_type: 'text' | 'media';
}

export interface Props_PostComment {
	post: number;
	user: Props_User;

	text: string;

	date_created: string;
}

// =================
export interface Props_Post_Content_Text {
	text: string;
}

export interface Props_Post_Content_Image {
	images: string[];
}

export interface Props_PostImages extends Props_Post_Content_Image {
	title: string;
}

export interface Props_Post_Content_Video {
	video: string;
}
