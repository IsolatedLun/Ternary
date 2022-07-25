import { urlRegex } from '../consts';
import type { Props_InputValidator } from './types';

export function maxLenValidator(n: number): Props_InputValidator {
	return {
		validate: (text: string) => text.length > n,
		text: `Must have atleast ${n} letters.`
	};
}

export function urlValidator(): Props_InputValidator {
	return {
		validate: (text: string) => urlRegex.test(text),
		text: `Must be a valid url.`
	};
}
