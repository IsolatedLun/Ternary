import axios from 'axios';
import type { Props_PostComment, Props_PostCommentReply } from '../components/Modules/Post/types';
import type {
	Props_CreatePost,
	Props_PostCommentData,
	Props_PostCommentReplyData,
	Props_VoteCommentData,
	Props_VoteCommentReplyData,
	Props_VotePostData
} from './types';
import { createHeaders, handleError } from './utils';
import {
	COMMENT_ON_POST_URL,
	CREATE_POST_URL,
	POSTS_URL,
	REPLY_ON_POST_COMMENT_URL,
	VOTE_COMMENT_REPLY_URL,
	VOTE_COMMENT_URL,
	VOTE_POST_URL
} from '../consts';

export async function getFeed() {
	const request = await axios.get(POSTS_URL, {
		headers: createHeaders({ auth: true })
	});
	const res = await request.data;

	if (request.status === 200)
		return res as import('../components/Modules/Post/types').Props_Post<number, any>[];
	else return [];
}

export async function getPost(id: number) {
	try {
		const request = await axios.get(POSTS_URL + '/' + id, {
			headers: createHeaders({ auth: true })
		});
		const res = await request.data;

		return res as import('../components/Modules/Post/types').Props_Post<
			Props_PostComment<Props_PostCommentReply[]>[],
			any
		>;
	} catch (e) {
		throw handleError(e);
	}
}

export async function createPost(data: Props_CreatePost) {
	try {
		const request = await axios.post(
			CREATE_POST_URL,
			{
				...data
			},
			{
				headers: createHeaders({ auth: true, formData: true })
			}
		);
		const res = (await request.data.id) as number;

		return res;
	} catch (e) {
		throw handleError(e);
	}
}

export async function commentOnPost(data: Props_PostCommentData) {
	try {
		const request = await axios.post(COMMENT_ON_POST_URL(data.postId), data, {
			headers: createHeaders({ auth: true })
		});

		return (await request.data) as Props_PostComment<any>;
	} catch (e) {
		throw handleError(e);
	}
}

export async function replyOnComment(data: Props_PostCommentReplyData) {
	try {
		const request = await axios.post(REPLY_ON_POST_COMMENT_URL(data.postId, data.commentId), data, {
			headers: createHeaders({ auth: true })
		});

		return (await request.data) as Props_PostComment<any>;
	} catch (e) {
		throw handleError(e);
	}
}

export async function votePost(data: Props_VotePostData) {
	try {
		const request = await axios.post(VOTE_POST_URL(data.postId), data, {
			headers: createHeaders({ auth: true })
		});

		return (await request.data) as Props_PostComment<Props_PostCommentReply[]>;
	} catch (e) {
		throw handleError(e);
	}
}

export async function voteComment(data: Props_VoteCommentData) {
	try {
		const request = await axios.post(VOTE_COMMENT_URL(data.postId, data.commentId), data, {
			headers: createHeaders({ auth: true })
		});

		return (await request.data) as Props_PostComment<any>;
	} catch (e) {
		throw handleError(e);
	}
}

export async function voteCommentReply(data: Props_VoteCommentReplyData) {
	try {
		const request = await axios.post(
			VOTE_COMMENT_REPLY_URL(data.postId, data.commentId, data.replyId),
			data,
			{
				headers: createHeaders({ auth: true })
			}
		);

		return (await request.data) as Props_PostComment<any>;
	} catch (e) {
		throw handleError(e);
	}
}
