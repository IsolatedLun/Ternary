import type { Props_InputValidator } from 'src/utils/types';

export function runValidators(
	e: HTMLInputElement | HTMLTextAreaElement,
	validators: Props_InputValidator[]
): string[] {
	let _errors: string[] = [];

	validators.forEach((validator) => {
		let res = validator.validate(e);

		if (!res) _errors.push(validator.text);
	});

	return [..._errors];
}
