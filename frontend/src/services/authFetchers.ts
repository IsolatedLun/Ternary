import axios from 'axios';
import { userState } from '../stores/userStore/userStore';
import { AUTHENTICATE_URL, LOGIN_URL, SIGNUP_URL } from '../consts';
import type { Props_Tokens } from './types';
import { handleError, propOrDef } from './utils';
import { createDefaultUser } from '../stores/_funcs';
import type {
	Props_LoginData,
	Props_LoginFetched,
	Props_SignupData
} from 'src/components/Layouts/Auth/types';

export async function authenticate() {
	const config = {
		headers: {
			authorization: getAuthHeader()
		},
		method: 'POST'
	};

	// Using fetch, since headers are not being added with axios.
	const request = await fetch(AUTHENTICATE_URL, config);
	const res = await request.json();

	if (request.ok) userState.set({ user: res, isLogged: true });
	else {
		setTokens({ refresh: '', access: '' });
		userState.set({ user: createDefaultUser(), isLogged: false });
	}
}

export async function login(data: Props_LoginData) {
	const request = await axios.post(LOGIN_URL, data);
	const res = await request.data;

	return res as Props_LoginFetched;
}

export async function signup(data: Props_SignupData) {
	const request = await axios.post(SIGNUP_URL, data, {
		headers: {
			'content-type': 'multipart/form-data'
		}
	});
	const res = await request.data;

	return res as Props_LoginFetched;
}

// Getters & Setters
export function getTokens(): Props_Tokens<string> {
	return {
		refresh: propOrDef(localStorage.getItem('refresh')!, 'null'),
		access: propOrDef(localStorage.getItem('access')!, 'null')
	};
}

export function setTokens(tokens: Props_Tokens<string>) {
	localStorage.setItem('refresh', tokens.refresh);
	localStorage.setItem('access', tokens.access);
}

export function getAuthHeader() {
	const tokens = getTokens();

	return `Bearer ${tokens.access}`;
}

export function logout() {
	userState.set({ user: createDefaultUser(), isLogged: false });
	setTokens({ refresh: '', access: '' });

	location.href = '/';
}
