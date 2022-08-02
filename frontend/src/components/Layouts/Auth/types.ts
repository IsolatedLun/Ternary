import type { Props_Tokens } from '../../../services/types';
import type { Props_User } from '../../../types';

export interface Props_LoginData {
	email_address: string;
	password: string;
}

export interface Props_SignupData {
	email_address: string;
	username: string;
	password: string;

	profile: File | null;
}

export interface Props_LoginFetched {
	user: Props_User;
	tokens: Props_Tokens<string>;
}
