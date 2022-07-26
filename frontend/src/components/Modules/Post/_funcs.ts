import type { Props_Post } from './types';

export function upvote(votes: number, prevAction: string): [number, string] {
	if (prevAction === 'neutral') return [votes + 1, 'upvote'];
	if (prevAction === 'upvote') return [votes - 1, 'neutral'];
	if (prevAction === 'downvote') return [votes + 2, 'upvote'];

	return [0, 'neutral'];
}

export function downvote(votes: number, prevAction: string): [number, string] {
	if (prevAction === 'neutral') return [votes - 1, 'downvote'];
	if (prevAction === 'downvote') return [votes + 1, 'neutral'];
	if (prevAction === 'upvote') return [votes - 2, 'downvote'];

	return [0, 'neutral'];
}

export function lenArrOrNum(x: any[] | number): number {
	return typeof x === 'object' ? x.length : x;
}

export function createTestPost<CommentT, ContentT>(
	content: ContentT,
	comments: CommentT
): Props_Post<CommentT, ContentT> {
	return {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		comments: comments,
		votes: 0,
		content: content,
		content_type: 'any',
		date_created: ''
	};
}
