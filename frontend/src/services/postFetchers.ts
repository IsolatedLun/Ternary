import axios from 'axios';

export async function getFeed() {
	const request = await axios.get('http://localhost:8000/posts');
	const res = await request.data;

	if (request.status === 200) return res as import('../components/Modules/Post/types').Props_Post[];
	else return [];
}
