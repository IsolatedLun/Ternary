import axios from 'axios';
import type { Props_PostComment } from '../components/Modules/Post/types';
import type { Props_CreatePost, Props_PostCommentData, Props_VotePostData } from './types';
import { createHeaders, handleError } from './utils';
import { COMMENT_ON_POST_URL, CREATE_POST_URL, POSTS_URL, VOTE_POST_URL } from '../consts';
import { getAuthHeader } from './authFetchers';

export async function getFeed() {
	const request = await axios.get(POSTS_URL);
	const res = await request.data;

	if (request.status === 200)
		return res as import('../components/Modules/Post/types').Props_Post<number, any>[];
	else return [];
}

export async function getPost(id: number) {
	try {
		const request = await axios.get(POSTS_URL + '/' + id, createHeaders({ auth: true }));
		const res = await request.data;

		return res as import('../components/Modules/Post/types').Props_Post<Props_PostComment[], any>;
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
			createHeaders({ auth: true, formData: true })
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
			headers: {
				authorization: getAuthHeader()
			}
		});

		return (await request.data) as Props_PostComment;
	} catch (e) {
		throw handleError(e);
	}
}

export async function votePost(data: Props_VotePostData) {
	try {
		const request = await axios.post(VOTE_POST_URL(data.postId), data, {
			headers: {
				authorization: getAuthHeader()
			}
		});

		return (await request.data) as Props_PostComment;
	} catch (e) {
		throw handleError(e);
	}
}
