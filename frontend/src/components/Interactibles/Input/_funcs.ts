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

	if (_errors.length > 0) e.setAttribute('data-input-valid', 'false');
	else e.setAttribute('data-input-valid', 'true');

	return [..._errors];
}
