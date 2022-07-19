export function generateNChars(r: number, char: string = 'w'): string {
	let res = '';

	for (r; r !== 0; r--) {
		res += char;
	}

	return res;
}
