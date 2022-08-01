import type { Props_User } from 'src/types';
import type { Store_UserState } from './userStore/types';

export function createEmptyUser(): Store_UserState {
	return {
		user: createDefaultUser(),
		isLogged: false
	};
}

export function createDefaultUser(): Props_User {
	return {
		username: '',
		profile: '',
		id: -1,
		honor: -1,
		is_staff: false,
		date_created: ''
	};
}
