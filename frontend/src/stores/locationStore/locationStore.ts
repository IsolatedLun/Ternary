import { writable } from 'svelte/store';
import type { Store_LocationState } from './types';

export const locationState = writable<Store_LocationState>({
	history: ['/']
});
