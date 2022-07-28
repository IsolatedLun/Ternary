import axios from 'axios';
import type { Props_PostComment } from '../components/Modules/Post/types';
import type { Props_CreatePost, Props_PostCommentData } from './types';
import { handleError } from './utils';
import { COMMENT_ON_POST_URL, CREATE_POST_URL, POSTS_URL } from '../consts';

export async function getFeed() {
	const request = await axios.get(POSTS_URL);
	const res = await request.data;

	if (request.status === 200)
		return res as import('../components/Modules/Post/types').Props_Post<number, any>[];
	else return [];
}

export async function getPost(id: number) {
	try {
		const request = await axios.get(POSTS_URL + '/' + id);
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
				...data,
				content: [...data.content]
			},
			{
				headers: {
					'content-type': 'multipart/form-data'
				}
			}
		);
		const res = (await request.data.id) as number;

		location.href = '/threads/' + res;
	} catch (e) {
		throw handleError(e);
	}
}

export async function commentOnPost(data: Props_PostCommentData) {
	try {
		const request = await axios.post(COMMENT_ON_POST_URL(data.postId), data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});

		return (await request.data) as Props_PostComment;
	} catch (e) {
		throw handleError(e);
	}
}
