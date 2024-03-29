import { act, render } from '@testing-library/svelte';
import 'jest';
import StatController from './StatController.svelte';

test('Upvote a post then downvote it for some reason.', async () => {
	const data = {
		votes: 0,
		comments: 0,
		action: 'neutral'
	};

	const { getByText } = render(StatController, { props: { props: data } });

	const upvoteBtn = document.querySelector('button[aria-label="Upvote"]')! as HTMLButtonElement;
	const downvoteBtn = document.querySelector('button[aria-label="Downvote"]')! as HTMLButtonElement;

	await act(() => {
		upvoteBtn.click(); // 0 => 1
	});

	expect(getByText('1')).not.toBeNull;

	await act(() => {
		downvoteBtn.click(); // 1 => -1
	});

	expect(getByText('-1')).not.toBeNull;
});
