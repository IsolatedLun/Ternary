import type { Props_InputValidator } from 'src/utils/types';

export function runValidators(e: Event | string, validators: Props_InputValidator[]): string[] {
	let _errors: string[] = [];
	let text = typeof e === 'object' ? (e.target as HTMLInputElement).value : e;

	validators.forEach((validator) => {
		console.log(e);
		let res = validator.validate(text);

		if (!res) _errors.push(validator.text);
	});

	return [..._errors];
}
