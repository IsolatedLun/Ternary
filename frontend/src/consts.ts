export const POST_MAX_CHARS = 600;

export const API_URL = 'http://localhost:8000';

// =========
// Icons
// =========
export const ICON_COMMENTS = '\uf4ad';
export const ICON_UPVOTE = '\uf062';
export const ICON_DOWNVOTE = '\uf063';
export const ICON_ARROW_LEFT = '\uf060';
export const ICON_ARROW_RIGHT = '\uf061';
export const ICON_HOME = '\uf015';
export const ICON_ERROR = '\uf06a';
export const ICON_PLUS = '\uf067';
export const ICON_IMAGE = '\uf03e';
export const ICON_LINK = '\uf0c1';
export const ICON_CARET_DOWN = '\uf0d7';
export const ICON_BARS = '\uf0c9';
export const ICON_TEXT = '\uf11c';
export const ICON_TRASH = '\uf1f8';
export const ICON_VIDEO = '\uf03d';
export const ICON_EDIT = '\uf044';

// Back-end Urls
export const POSTS_URL = API_URL + '/posts';
export const CREATE_POST_URL = POSTS_URL + '/create';
export const COMMENT_ON_POST_URL = (id: number) => POSTS_URL + `/${id}` + '/comment';

// Regex
export const urlRegex =
	/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
