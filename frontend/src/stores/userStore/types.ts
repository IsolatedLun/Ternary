export interface Store_UserState {
	user: Store_User;
	isLogged: boolean;
}

interface Store_User {
	id: number;
	honor: number;

	username: string;
	profile: string;

	is_staff: boolean;
}
