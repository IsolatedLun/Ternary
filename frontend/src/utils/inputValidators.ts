import { emailRegex, urlRegex } from '../consts';
import type { Props_InputValidator } from './types';

export function minLenValidator(n: number): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		text: `Must have atleast ${n} character(s).`
	};
}

export function urlValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => urlRegex.test(e.value),
		text: `Must be a valid url.`
	};
}

export function emailValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => emailRegex.test(e.value),
		text: `Must be a valid email address. (eg. something@gmail.com)`
	};
}

export function imageValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => isImageLoop(e),
		text: 'Must be an image.'
	};
}

export function customValidator(cb: Function, text: string): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => cb(e),
		text: text
	};
}

export function containsFile(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => e.files && e.files.length > 0,
		text: 'Must contain a file.'
	};
}

export function videoValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => {
			if (e.files && e.files[0]) return isVideo(e.files[0]);
			return false;
		},
		text: 'Must be an video.'
	};
}

// Misc
export function isImage(file: File) {
	return file.type.split('/')[0] === 'image';
}

export function isVideo(file: File) {
	return file.type.split('/')[0] === 'video';
}

export function isImageLoop(e: HTMLInputElement) {
	const files = e.files! as any;

	for (let i = 0; i < files.length; i++) {
		if (!isImage(files[i])) return false;
	}
	return true;
}

export function validInputs(formEl: HTMLFormElement) {
	const inputs = formEl.querySelectorAll('.input, [data-custom-input]');

	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute('data-input-valid') === 'false') return false;
	}

	return true;
}
