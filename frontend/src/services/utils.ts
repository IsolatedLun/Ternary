import { capitalize } from '../utils/generalFuncs';
import { getAuthHeader, getTokens } from './authFetchers';
import type { ErrorResponse, Props_CreateHeaderOptions, Props_HandledError } from './types';

export function handleError(e: any): Props_HandledError {
	function isErrorResponse(e: any): e is ErrorResponse {
		return e.response.data.detail !== undefined;
	}

	if (isErrorResponse(e)) {
		const err = e.response.data.detail;

		if (err.startsWith('UNIQUE')) {
			const inputName = err.split('.')[1];
			return {
				detail: capitalize(inputName) + ' already exists.',
				toMark: inputName + '-input'
			};
		}

		return {
			detail: err
		};
	}

	return {
		detail: 'Something went wrong.'
	};
}

export function propOrDef<T, D>(x: T, def: D) {
	return x ? x : def;
}

export function createHeaders(options: Props_CreateHeaderOptions) {
	const headers: any = {};

	if (options.auth && getTokens().access !== 'null') {
		headers['authorization'] = getAuthHeader();
	}

	if (options.formData) {
		headers['content-type'] = 'multipart/form-data';
	}

	return headers;
}
