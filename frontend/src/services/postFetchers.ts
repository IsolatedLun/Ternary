import axios from 'axios';
import type { Props_PostComment } from '../components/Modules/Post/types';

export async function getFeed() {
	const request = await axios.get('http://localhost:8000/posts');
	const res = await request.data;

	if (request.status === 200)
		return res as import('../components/Modules/Post/types').Props_Post<number, any>[];
	else return [];
}

export async function getPost(id: number) {
	const request = await axios.get('http://localhost:8000/posts/' + id);
	const res = await request.data;

	if (request.status === 200)
		return res as import('../components/Modules/Post/types').Props_Post<Props_PostComment[], any>;
	else throw 'lol';
}
