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
	content: any;
	content_type: string;
}

export interface Props_PostCommentData {
	text: string;
	postId: number;
}

export interface Props_VotePostData {
	votes: number;
	postId: number;
}
