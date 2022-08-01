export interface Props_CubeCSS {
	blockClass?: string;
	compostClass?: string;
	utilClass?: string;
}

export interface Props_User extends Props_DataModel {
	honor: number;

	username: string;
	profile: string;

	is_staff: boolean;
}

export interface Props_DataModel {
	id: number;
	date_created: string;
}
