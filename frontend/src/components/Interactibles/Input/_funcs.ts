export function runValidators(e: Event | string, validators: Function[]): string[] {
	let _errors: string[] = [];
	let text = typeof e === 'object' ? (e.target as HTMLInputElement).value : e;

	validators.forEach((validator) => {
		let res = validator(text);

		if (res) _errors.push(res);
	});

	return [..._errors];
}
