export function goBack(history: string[], fallback: string = '/'): string {
	return history[history.length - 2] ? history[history.length - 2] : fallback;
}
