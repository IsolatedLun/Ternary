import axios from 'axios';
import { userState } from '../stores/userStore/userStore';
import { AUTHENTICATE_URL } from '../consts';
import type { Props_Tokens } from './types';
import { handleError, propOrDef } from './utils';

export async function authenticate() {
	const config = {
		headers: {
			authorization: getAuthHeader()
		},
		method: 'POST'
	};

	try {
		// Using fetch, since headers are not being added with axios.
		const request = await fetch(AUTHENTICATE_URL, config);
		const res = await request.json();

		userState.set({ user: res, isLogged: true });
	} catch (e) {
		setTokens({ refresh: '', access: '' });
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

function getAuthHeader() {
	const tokens = getTokens();

	return `Bearer ${tokens.access}`;
}
