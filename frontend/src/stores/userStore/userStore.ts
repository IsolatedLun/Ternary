import { writable } from 'svelte/store';
import type { Store_UserState } from './types';

export const userState = writable<Store_UserState>({
	user: {
		username: '',
		profile: '',
		id: -1,
		honor: -1,
		is_staff: false
	},
	isLogged: false
});
