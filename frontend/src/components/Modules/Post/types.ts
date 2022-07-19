import type { Props_DataModel, Props_User } from 'src/types';

export interface Props_Post extends Props_DataModel {
	user: Props_User;

	title: string;
	content: string;
	content_type: string;
}
