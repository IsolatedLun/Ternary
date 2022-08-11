export interface Props_InputValidator {
	validate: Function;
	text: string;
}

export interface Props_FormHook {
	validateForm: Function;
	markInput: (name: string) => void;
}
