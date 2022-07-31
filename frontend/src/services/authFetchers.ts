import axios from 'axios';
import { AUTHENTICATE_URL } from '../consts';
import type { Props_User } from '../types';
import type { Props_Tokens } from './types';
import { handleError, propOrDef } from './utils';

export async function authenticate() {
	try {
		// Add authorization header.
		const request = await axios.post(AUTHENTICATE_URL);
		const res = (await request.data) as Props_User;

		return res;
	} catch (e) {
		throw handleError(e);
	}
}

// Getters & Setters
function getTokens(): Props_Tokens<string> {
	return {
		refresh: propOrDef(localStorage.getItem('refresh')!, 'null'),
		access: propOrDef(localStorage.getItem('access')!, 'null')
	};
}

function setTokens(tokens: Props_Tokens<string>) {
	localStorage.setItem('refresh', tokens.refresh);
	localStorage.setItem('access', tokens.access);
}

function createAuthHeader() {
	const tokens = getTokens();

	return `Bearer ${tokens.access}`;
}
