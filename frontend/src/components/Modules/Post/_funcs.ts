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
