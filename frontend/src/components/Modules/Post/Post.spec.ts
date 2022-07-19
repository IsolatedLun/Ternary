import { render } from '@testing-library/svelte';
import 'jest';
import { generateNChars } from '../../../utils/testFuncs';
import Post from './Post.svelte';

test('Render a post that has a long paragraph which toggles the view text button', () => {
	const data = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		content: generateNChars(1000),
		content_type: 'text',
		date_created: ''
	};

	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('View Text')).toBeTruthy();
});
