import { urlRegex } from '../consts';
import type { Props_InputValidator } from './types';

export function maxLenValidator(n: number): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n,
		text: `Must have atleast ${n} letters.`
	};
}

export function urlValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => urlRegex.test(e.value),
		text: `Must be a valid url.`
	};
}

export function imageValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => {
			const files = e.files! as any;

			for (let i = 0; i < files.length; i++) {
				if (!isImage(files[i])) return false;
			}
			return true;
		},
		text: `Must be an image.`
	};
}

// Misc
export function isImage(file: File) {
	return file.type.split('/')[0] === 'image';
}
