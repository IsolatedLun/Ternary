import type { Props_DataModel } from 'src/types';

export interface Store_UserState {
	user: Store_User;
	isLogged: boolean;
}

export interface Store_User extends Props_DataModel {
	id: number;
	honor: number;

	username: string;
	profile: string;

	is_staff: boolean;
}
