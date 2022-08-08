import type { Props_Community } from 'src/components/Layouts/Community/types';
import type { Props_GroupInvite } from 'src/components/Modules/Miscellaneuos/types';
import type {
	Props_Post,
	Props_PostComment,
	Props_PostCommentReply
} from 'src/components/Modules/Post/types';
import type { Store_UserState } from 'src/stores/userStore/types';
import type { Props_User } from 'src/types';

// ===========
// Users
// ===========
export function createDefaultUser(): Props_User {
	return {
		username: '',
		profile: '',
		date_created: '',

		id: -1,
		honor: -1,
		is_staff: false
	};
}

export function createEmptyUserStore(): Store_UserState {
	return {
		user: createDefaultUser(),

		isLogged: false
	};
}

// ===========
// Community
// ===========
export function createDefaultCommunity(): Props_Community<null, number> {
	return {
		id: 0,
		members: 0,
		posts: null,
		joined: false,

		banner: '',
		profile: '',
		name: '',
		date_created: ''
	};
}

// ===========
// Posts
// ===========
export function createTestPost<CommentT, ContentT>(
	content: ContentT,
	comments: CommentT,
	contentType: string = 'any'
): Props_Post<CommentT, ContentT> {
	return {
		user: createDefaultUser(),

		id: 0,
		comments: comments,
		community: createDefaultCommunity() as any,

		votes: 0,
		content: content,
		content_type: contentType as any,

		title: 'Lol',
		date_created: '',
		vote_type: 'neutral'
	};
}

export function createDefaultComment<ReplyT>(replies: ReplyT): Props_PostComment<ReplyT> {
	return {
		user: createDefaultUser(),

		id: 0,
		post: 0,
		replies: replies,
		votes: 0,

		text: '',
		vote_type: 'neutral',
		date_created: ''
	};
}

export function createDefaultCommentReply(): Props_PostCommentReply {
	return {
		user: createDefaultUser(),

		id: 0,
		post: 0,
		comment: 0,
		votes: 0,

		text: '',
		vote_type: 'neutral',
		reply_to: 'comment',
		date_created: ''
	};
}

export function createDefaultCommunityInvite(): Props_GroupInvite {
	return {
		id: 0,
		members: 0,

		name: '',
		profile: ''
	};
}

export function createDefaultCommunityTestInvite(name: string, members: number): Props_GroupInvite {
	return {
		id: 0,
		members: members,

		name: name,
		profile: ''
	};
}
