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
export const ICON_USER = '\uf007';
export const ICON_SHIELD = '\uf132';

// =================================================
// =================================================

// ==============
// Auth urls
// ==============
export const AUTH_URL = API_URL + '/auth';
export const AUTHENTICATE_URL = AUTH_URL + '/authenticate';
export const LOGIN_URL = AUTH_URL + '/login';
export const SIGNUP_URL = AUTH_URL + '/signup';

// ==============
// Backend urls
// ==============
export const POSTS_URL = API_URL + '/posts';
export const CREATE_POST_URL = POSTS_URL + '/create';
export const COMMENT_ON_POST_URL = (id: number) => POSTS_URL + `/${id}` + '/comment';

export const REPLY_ON_POST_COMMENT_URL = (postId: number, commentId: number) =>
	POSTS_URL + `/${postId}/comment/` + commentId + '/reply';

// ==============
// Voting urls
// ==============
export const VOTE_COMMENT_URL = (postId: number, commentId: number) =>
	POSTS_URL + `/${postId}` + '/vote/comment/' + commentId;

export const VOTE_POST_URL = (id: number) => POSTS_URL + `/${id}` + '/vote/post';

export const VOTE_COMMENT_REPLY_URL = (postId: number, commentId: number, replyId: number) =>
	POSTS_URL + `/${postId}` + '/vote/comment/' + commentId + '/reply/' + replyId;

// ==============
// Community urls
// ==============
export const COMMUNITIES_URL = API_URL + '/communities';
export const RELEVANT_COMMUNITIES_URL = COMMUNITIES_URL + '/relevant';
export const COMMUNITY_URL = (id: number) => COMMUNITIES_URL + `/${id}`;
export const TOP_COMMUNITY_MEMBERS_URL = (id: number) => COMMUNITIES_URL + `/${id}/top/members`;
export const JOIN_COMMUNITY_URL = (id: number) => COMMUNITIES_URL + `/${id}/join`;

// ==============
// User urls
// ==============
export const USER_URL = (id: number) => AUTH_URL + `/users/${id}`;

// ========================================================================
// ========================================================================

// ==============
// Regex
// ==============
export const urlRegex =
	/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
export let emailRegex =
	/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

// ==============
// Misc
// ==============
export const VIDEO_PAUSE_THRESHOLD = 0.5;
export const POST_CREATION_RULES = [
	'Post must be clear and conscise.',
	"Don't be a twat.",
	'Have fun.'
];

export const POST_SELECT_VALUES = ['Top', 'Controversial', 'Hot', 'New'];
