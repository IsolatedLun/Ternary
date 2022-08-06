import { act, render } from '@testing-library/svelte';
import 'jest';
import { createDefaultCommuunityInvite } from 'src/utils/defaultCreates';
import type { Props_GroupInvite } from '../types';
import MiscGroup from './MiscGroup.svelte';

test('Render a Misc Group and join it.', async () => {
	let data: Props_GroupInvite = createDefaultCommuunityInvite();

	const { getByText } = render(MiscGroup, { props: { props: data } });

	expect(getByText('g/Cats')).toBeTruthy();

	const joinBtn = getByText('Join') as HTMLButtonElement;
	expect(getByText(/123 members/i)).toBeTruthy();

	await act(() => {
		joinBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});

	expect(getByText(/124 members/i)).toBeTruthy();
	expect(getByText('Joined')).toBeTruthy();
});
