import { act, render } from '@testing-library/svelte';
import 'jest';
import { createDefaultCommunityTestInvite } from '../../../../utils/defaultCreates';
import type { Props_GroupInvite } from '../types';
import MiscGroup from './MiscGroup.svelte';

test('Render a Misc Group and join it.', async () => {
	let data: Props_GroupInvite = createDefaultCommunityTestInvite('Cats', 123);

	const { getByText } = render(MiscGroup, { props: { props: data } });

	expect(getByText('g/Cats')).toBeTruthy();

	const joinBtn = getByText('Join') as HTMLButtonElement;
	expect(getByText(/123/i)).toBeTruthy();

	await act(() => {
		joinBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});

	expect(getByText(/124/i)).toBeTruthy();
	expect(getByText('Joined')).toBeTruthy();
});
