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

export interface Props_VotePostData {
	votes: number;
	postId: number;
	type: string;
}

export interface Props_Tokens<T> {
	refresh: T;
	access: T;
}

export interface Props_CreateHeaderOptions {
	auth?: boolean | null;
	formData?: boolean | null;
}
