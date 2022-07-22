export interface ErrorResponse {
	response: {
		data: {
			detail: string;
		};

		status: number;
	};
}
