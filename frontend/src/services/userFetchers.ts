import axios from 'axios';
import { USER_URL } from '../consts';
import type { Props_UserViewData } from './types';
import { createHeaders, handleError } from './utils';

export async function getUser(id: number) {
	try {
		const request = await axios.get(USER_URL(id), {
			headers: createHeaders({ auth: true })
		});
		const res = await request.data;

		return res as Props_UserViewData;
	} catch (e) {
		throw handleError(e);
	}
}
