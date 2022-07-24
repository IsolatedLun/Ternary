import { act, render } from '@testing-library/svelte';
import 'jest';
import { generateNChars } from '../../../utils/testFuncs';
import Post from './Post.svelte';
import type {
	Props_Post,
	Props_PostComment,
	Props_Post_Content_Image,
	Props_Post_Content_Text
} from './types';
import { createTestPost } from './_funcs';

test('Render a post that has a long paragraph', () => {
	const data: Props_Post<number, Props_Post_Content_Text> = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		comments: 0,
		votes: 0,
		content: { text: generateNChars(1000) },
		content_type: 'text',
		date_created: ''
	};

	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('Lol')).toBeTruthy();
});

test('Render a post that has a multiple images and go through them', async () => {
	const data = createTestPost<number, Props_Post_Content_Image>(0);

	const {} = render(Post, { props: { props: data } });
	const content = data.content as Props_Post_Content_Image;

	// Index is 0
	let imgEl = document.querySelector(`img[src="${content.images[0]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();

	const nextBtn = document.querySelector('.button[aria-label="Next Image"]')! as HTMLButtonElement;

	await act(() => {
		nextBtn.click(); // Index is 1
	});

	imgEl = document.querySelector(`img[src="${content.images[1]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();
});
