import axios from 'axios';
import { constructFormData } from '../utils/generalFuncs';
import type { Props_PostComment } from '../components/Modules/Post/types';
import type { ErrorResponse, Props_CreatePost } from './types';
import { handleError } from './utils';
import { CREATE_POST_URL, POSTS_URL } from '../consts';

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
