import type { ErrorResponse } from './types';

export function handleError(e: any) {
	function isErrorResponse(e: any): e is ErrorResponse {
		return e.response.data.detail !== undefined;
	}

	if (isErrorResponse(e)) {
		return e.response.data.detail;
	}

	return 'Something went wrong';
}
