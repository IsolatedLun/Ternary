import { act, render } from '@testing-library/svelte';
import 'jest';
import { generateNChars } from '../../../utils/testFuncs';
import Post from './Post.svelte';
import type { Props_Post } from './types';
import { createTestPost } from './_funcs';

test('Render a post that has a long paragraph', () => {
	const data = createTestPost(generateNChars(1000), 0);
	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('Lol')).toBeTruthy();
});

test('Render a post that has a multiple images and go through them', async () => {
	const data = createTestPost(['image1.png', 'image2.png'], 0);

	const {} = render(Post, { props: { props: data } });
	const content = data.content;

	// Index is 0
	let imgEl = document.querySelector(`img[src="${content[0]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();

	const nextBtn = document.querySelector('.button[aria-label="Next Image"]')! as HTMLButtonElement;

	await act(() => {
		nextBtn.click(); // Index is 1
	});

	imgEl = document.querySelector(`img[src="${content[1]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();
});
