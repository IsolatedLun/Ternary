import { getAuthHeader, getTokens } from './authFetchers';
import type { ErrorResponse, Props_CreateHeaderOptions } from './types';

export function handleError(e: any) {
	function isErrorResponse(e: any): e is ErrorResponse {
		return e.response.data.detail !== undefined;
	}

	if (isErrorResponse(e)) {
		return e.response.data.detail;
	}

	return 'Something went wrong';
}

export function propOrDef<T, D>(x: T, def: D) {
	return x ? x : def;
}

export function createHeaders(options: Props_CreateHeaderOptions) {
	const headers: any = {};

	if (options.auth && getTokens().access) {
		headers['authorization'] = getAuthHeader();
	}

	if (options.formData) {
		headers['content-type'] = 'multipart/form-data';
	}

	return headers;
}
